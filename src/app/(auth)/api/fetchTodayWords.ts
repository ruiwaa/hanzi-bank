import { supabase } from "@/lib/supabase";
import { HskWord, WordExample } from "@/types/DBTypes";
import { cacheLife } from "next/cache";

export interface TodayWords extends HskWord {
  word_examples: WordExample[];
}
export async function fetchTodayWords(): Promise<TodayWords[]> {
  "use cache";
  cacheLife("days");

  const { data, error } = await supabase
    .from("hsk_words")
    .select(`*, word_examples (*)`)
    .order("frequency", { ascending: false })
    .limit(800);

  if (error) {
    throw error;
  }

  if (!data) {
    return [];
  }

  const todayWords = [...data].toSorted(() => Math.random() - 0.5).slice(0, 3);

  return todayWords;
}
