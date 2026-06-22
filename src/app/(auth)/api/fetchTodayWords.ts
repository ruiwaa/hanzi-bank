import { supabase } from "@/lib/supabase";
import { HskWord, WordExample } from "@/types/DBTypes";
import { cacheLife } from "next/cache";

export interface TodayWords extends HskWord {
  word_examples: WordExample[];
}
export async function fetchTodayWords(): Promise<TodayWords[]> {
  "use cache";
  console.log("fetchTodayWords 실행");
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
  const today = new Date().toISOString().slice(0, 10);
  const formatDate = Number(today.replaceAll("-", ""));
  const start = formatDate % data.length;
  const todayWords = [
    data[start],
    data[(start + 1) % data.length],
    data[(start + 2) % data.length],
  ];

  return todayWords;
}
