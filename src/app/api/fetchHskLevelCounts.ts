import { supabase } from "@/lib/supabase/client";

interface HskLevelCount {
  level: number;
  count: number;
}

/**
 * 급수별 저장되어있는 중단어의 총 개수를 조회합니다.
 * @param {number} level - 중단어 급수 (1~6급)
 * @returns  {Promise<HskLevelCount>} - 급수별 단어 총 개수
 */

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
