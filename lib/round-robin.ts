import { supabase } from "@/lib/supabase";
import type { Vocabulary } from "@/lib/spaced-repetition";

// ── Types ────────────────────────────────────────────────────────────────────

export interface MarkSeenResult {
  seenCount: number;
  total: number;
  round: number;
  roundJustCompleted: boolean;
  newSeenSet: Set<string>;
  playCounts: Record<string, number>;
}

interface RoundProgress {
  seenIds: Set<string>;
  round: number;
  updatedAt: string;
  playCounts: Record<string, number>;
}

interface LocalRoundData {
  seen_ids: string[];
  round: number;
  updated_at: string;
  play_counts?: Record<string, number>;
}

// ── Module-level auth flag ────────────────────────────────────────────────────

let anonSessionFailed = false;

// ── Public: Anon session ──────────────────────────────────────────────────────

/**
 * Ensures an anonymous Supabase session exists.
 * On any failure, sets anonSessionFailed so all callers fall back to localStorage.
 */
export async function ensureAnonSession(): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return;

    const { error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.warn("[round-robin] anon sign-in failed – localStorage only:", error.message);
      anonSessionFailed = true;
    }
  } catch (e) {
    console.warn("[round-robin] ensureAnonSession threw – localStorage only:", e);
    anonSessionFailed = true;
  }
}

// ── localStorage helpers ──────────────────────────────────────────────────────

function lsKey(moduleId: string): string {
  return `lingo_rr_${moduleId}`;
}

function readLs(moduleId: string): RoundProgress {
  try {
    const raw = localStorage.getItem(lsKey(moduleId));
    if (!raw) return { seenIds: new Set(), round: 1, updatedAt: new Date(0).toISOString(), playCounts: {} };
    const d: LocalRoundData = JSON.parse(raw);
    return {
      seenIds: new Set(d.seen_ids ?? []),
      round: d.round ?? 1,
      updatedAt: d.updated_at ?? new Date(0).toISOString(),
      playCounts: d.play_counts ?? {},
    };
  } catch {
    return { seenIds: new Set(), round: 1, updatedAt: new Date(0).toISOString(), playCounts: {} };
  }
}

function writeLs(moduleId: string, seenIds: Set<string>, round: number, playCounts: Record<string, number>): void {
  try {
    const d: LocalRoundData = {
      seen_ids: Array.from(seenIds),
      round,
      updated_at: new Date().toISOString(),
      play_counts: playCounts,
    };
    localStorage.setItem(lsKey(moduleId), JSON.stringify(d));
  } catch (e) {
    console.warn("[round-robin] localStorage write failed:", e);
  }
}

// ── Supabase helper ───────────────────────────────────────────────────────────

async function upsertDb(
  userId: string,
  moduleId: string,
  seenIds: Set<string>,
  round: number,
  playCounts: Record<string, number>
): Promise<{ error: unknown }> {
  const { error } = await supabase.from("module_round_progress").upsert(
    {
      user_id: userId,
      module_id: moduleId,
      seen_ids: Array.from(seenIds),
      round,
      updated_at: new Date().toISOString(),
      play_counts: playCounts,
    },
    { onConflict: "user_id,module_id" }
  );
  return { error };
}

// ── Public: Read progress ─────────────────────────────────────────────────────

/**
 * Returns the current round-robin progress for a module.
 * Reads from Supabase (with localStorage mirror/fallback).
 * On first load after being offline: pushes localStorage state to DB if it is newer.
 */
export async function getProgress(moduleId: string): Promise<RoundProgress> {
  if (anonSessionFailed) return readLs(moduleId);

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return readLs(moduleId);

    const { data, error } = await supabase
      .from("module_round_progress")
      .select("seen_ids, round, updated_at, play_counts")
      .eq("user_id", user.id)
      .eq("module_id", moduleId)
      .maybeSingle();

    if (error) {
      console.warn("[round-robin] Supabase read returned an error — using localStorage:", error);
      return readLs(moduleId);
    }
    if (!data) return readLs(moduleId);

    const lsData = readLs(moduleId);
    const dbTs = new Date(data.updated_at).getTime();
    const lsTs = new Date(lsData.updatedAt).getTime();

    if (lsTs > dbTs) {
      // Offline progress is newer – sync up to DB
      await upsertDb(user.id, moduleId, lsData.seenIds, lsData.round, lsData.playCounts);
      return lsData;
    }

    const dbProgress: RoundProgress = {
      seenIds: new Set((data.seen_ids as string[]) ?? []),
      round: (data.round as number) ?? 1,
      updatedAt: data.updated_at as string,
      playCounts: (data.play_counts as Record<string, number>) ?? {},
    };
    writeLs(moduleId, dbProgress.seenIds, dbProgress.round, dbProgress.playCounts);
    return dbProgress;
  } catch {
    return readLs(moduleId);
  }
}

// ── Public: Mark seen ─────────────────────────────────────────────────────────

/**
 * Marks wordId as seen for this module (Change 1: called on Weiter, not on display).
 * Increments play_counts[wordId] by 1 — never resets across rounds.
 * If all vocab in allVocabIds are now seen: increments round and resets seen set.
 * Persists to localStorage always; Supabase if anon session is active.
 */
export async function markSeen(
  moduleId: string,
  wordId: string,
  allVocabIds: string[]
): Promise<MarkSeenResult> {
  // Read from localStorage (always the authoritative in-memory mirror during a session)
  const current = readLs(moduleId);

  // Increment lifetime play counter — separate from seenIds, never reset
  const playCounts = { ...current.playCounts };
  playCounts[wordId] = (playCounts[wordId] ?? 0) + 1;

  current.seenIds.add(wordId);

  const total = allVocabIds.length;
  const allCovered =
    total > 0 && allVocabIds.every((id) => current.seenIds.has(id));

  let roundJustCompleted = false;
  if (allCovered) {
    roundJustCompleted = true;
    current.round += 1;
    current.seenIds = new Set();
    // playCounts is NOT touched here — survives round reset
  }

  writeLs(moduleId, current.seenIds, current.round, playCounts);

  if (!anonSessionFailed) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await upsertDb(user.id, moduleId, current.seenIds, current.round, playCounts);
        if (error) {
          console.warn("[round-robin] Supabase upsert returned an error — data is in localStorage only:", error);
        } else {
          console.info("[round-robin] synced to Supabase:", moduleId, "seen:", current.seenIds.size, "round:", current.round);
        }
      } else {
        console.info("[round-robin] stored locally only (no Supabase session):", moduleId);
      }
    } catch (e) {
      console.warn("[round-robin] Supabase upsert failed (stored in localStorage):", e);
    }
  } else {
    console.info("[round-robin] stored locally only (no Supabase session):", moduleId);
  }

  return {
    seenCount: current.seenIds.size,
    total,
    round: current.round,
    roundJustCompleted,
    newSeenSet: current.seenIds,
    playCounts,
  };
}

// ── Public: Pick next ─────────────────────────────────────────────────────────

/**
 * Picks a random unseen word from moduleVocab.
 * Returns null only when moduleVocab is empty (shouldn't happen in practice).
 * moduleVocab must be passed live from getModuleVocab() — never cached here.
 */
export function pickNext(
  _moduleId: string,
  moduleVocab: Vocabulary[],
  seenSet: Set<string>
): Vocabulary | null {
  const unseen = moduleVocab.filter((v) => !seenSet.has(v.id));
  if (unseen.length === 0) return null;
  return unseen[Math.floor(Math.random() * unseen.length)];
}

// ── Public: Play count helpers ────────────────────────────────────────────────

/**
 * Returns the play_counts map for a module from localStorage (synchronous).
 * Used by ModuleSelection to compute averages without async Supabase calls.
 */
export function getModulePlayCounts(moduleId: string): Record<string, number> {
  return readLs(moduleId).playCounts;
}

/**
 * Computes average plays per word across the live vocab list only.
 * Stale ids in play_counts (removed words) are excluded automatically.
 * Words not yet in play_counts count as 0.
 */
export function calcModuleAverage(
  playCounts: Record<string, number>,
  liveVocabIds: string[]
): number {
  if (liveVocabIds.length === 0) return 0;
  const sum = liveVocabIds.reduce((acc, id) => acc + (playCounts[id] ?? 0), 0);
  return sum / liveVocabIds.length;
}
