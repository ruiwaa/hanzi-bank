"use cache";

import { supabase } from "@/lib/supabase";
import { HskWord } from "@/types/DBTypes";
import { cacheLife } from "next/cache";

export interface HskLevelWords {
  level: number;
  words: HskWord[];
}

export async function fetchAllHskLevelWords(
  level: number,
): Promise<HskLevelWords> {
  cacheLife("days");
  const { data, error } = await supabase
    .from("hsk_words")
    .select("*")
    .eq("hsk_level", level)
    .order("frequency", { ascending: true });

  if (error) throw error;

  return {
    level,
    words: data ?? [],
  };
}
