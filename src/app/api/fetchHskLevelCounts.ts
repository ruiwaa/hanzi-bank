import { supabase } from "@/lib/supabase";

interface HskLevelCount {
  level: number;
  count: number;
}
export async function fetchHskLevelCounts(
  level: number,
): Promise<HskLevelCount> {
  const { count, error } = await supabase
    .from("hsk_words")
    .select("*", { count: "exact", head: true })
    .eq("hsk_level", level);

  if (error) {
    console.error(error);
    throw error;
  }
  return {
    level,
    count: count ?? 0,
  };
}
