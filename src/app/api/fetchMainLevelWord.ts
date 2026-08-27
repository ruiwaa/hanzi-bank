import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { supabase } from "@/lib/supabase/client";
import { HskWord } from "@/types/DBTypes";

export interface MainLevelWords {
  level: number;
  words: HskWord[];
}

/**
 * 메인페이지의 각 급수별 빈도 높은 순으로 정렬하여
 * limit 개수에 따라 개수만큼의 단어를 보여주기 위해 추가한 api 함수 입니다.
 * @returns Promise<MainLevelWords[]> - 빈도 높은 순의 급수별 단어 배열
 */
export async function fetchMainLevelWords(): Promise<MainLevelWords[]> {
  "use cache";

  const result = await Promise.all(
    HSK_LEVELS.map(async ({ level }) => {
      const { data, error } = await supabase
        .from("hsk_words")
        .select("*")
        .eq("hsk_level", level)
        .order("frequency", { ascending: true })
        .limit(8);

      if (error) throw error;

      return {
        level,
        words: data ?? [],
      };
    }),
  );

  return result;
}
