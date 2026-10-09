import { getVocabById, type Vocabulary } from "./spaced-repetition";
import { moduleDataMap, type PhrasesModule } from "./ModuleContext";
import { getFavorites, setFavorites } from "./local-storage";

export interface FavoriteEntry extends Vocabulary {
  source: "vocab" | "phrase";
}

// Index aller Phrasen (p-IDs aus phrasen.json, r-IDs aus redewendungen.json, …)
let phraseIndex: Map<string, FavoriteEntry> | null = null;

function getPhraseIndex(): Map<string, FavoriteEntry> {
  if (phraseIndex) return phraseIndex;
  phraseIndex = new Map();
  for (const mod of Object.values(moduleDataMap)) {
    if (mod.type !== "phrases") continue;
    for (const p of (mod as PhrasesModule).phrases) {
      const id = String(p.id);
      if (phraseIndex.has(id)) continue;
      phraseIndex.set(id, {
        id,
        spanish: p.spanish,
        german: p.german,
        type: "phrase",
        sentence_es: p.sentence_es || "",
        sentence_de: p.sentence_de || "",
        audio: p.audio || "",
        note: p.literal || undefined,
        word_translations: p.word_translations || {},
        source: "phrase",
      });
    }
  }
  return phraseIndex;
}

// Löst eine Favoriten-ID auf: erst vocabulario-es.json, dann alle Phrasen-Module
export function resolveFavorite(id: string | number): FavoriteEntry | null {
  const key = String(id);
  const vocab = getVocabById(key);
  if (vocab) return { ...vocab, source: "vocab" };
  return getPhraseIndex().get(key) ?? null;
}

// Teilt Favoriten in auflösbare und nicht (mehr) auflösbare IDs
export function splitFavorites(ids: string[]): { resolved: FavoriteEntry[]; unresolvedIds: string[] } {
  const resolved: FavoriteEntry[] = [];
  const unresolvedIds: string[] = [];
  for (const id of ids) {
    const entry = resolveFavorite(id);
    if (entry) resolved.push(entry);
    else unresolvedIds.push(String(id));
  }
  return { resolved, unresolvedIds };
}

// Entfernt nur nicht auflösbare IDs — aufgelöste Favoriten bleiben unangetastet
export function removeUnresolvedFavorites(): number {
  const ids = getFavorites();
  const kept = ids.filter((id) => resolveFavorite(id) !== null);
  setFavorites(kept);
  return ids.length - kept.length;
}
