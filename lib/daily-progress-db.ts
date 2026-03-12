import { supabase } from "@/lib/supabase";

export async function loadProgressFromDb(moduleId: string): Promise<number | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("daily_progress")
    .select("count")
    .eq("user_id", user.id)
    .eq("date", today)
    .eq("module_id", moduleId)
    .maybeSingle();

  return data?.count ?? null;
}

export async function syncProgressToDb(moduleId: string, count: number): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const today = new Date().toISOString().split("T")[0];
  await supabase
    .from("daily_progress")
    .upsert(
      { user_id: user.id, date: today, module_id: moduleId, count, updated_at: new Date().toISOString() },
      { onConflict: "user_id,date,module_id" }
    );
}
