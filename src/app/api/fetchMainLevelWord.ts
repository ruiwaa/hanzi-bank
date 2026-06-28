import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { supabase } from "@/lib/supabase";
import { HskWord } from "@/types/DBTypes";

export interface MainLevelWords {
  level: number;
  words: HskWord[];
}

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
