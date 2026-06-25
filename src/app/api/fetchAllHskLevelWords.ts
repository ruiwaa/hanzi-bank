"use cache";

import { supabase } from "@/lib/supabase";
import { HskWord } from "@/types/DBTypes";
import { cacheLife } from "next/cache";

export interface HskLevelWords {
  level: number;
  words: HskWord[];
  page: number;
  limit: number;
  totalCount: number;
}

export async function fetchAllHskLevelWords(
  level: number,
  page: number,
  limit: number,
): Promise<HskLevelWords> {
  cacheLife("days");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("hsk_words")
    .select("*", { count: "exact" })
    .eq("hsk_level", level)
    .order("frequency", { ascending: true });

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error(error);
    throw error;
  }

  return {
    level,
    words: data ?? [],
    page,
    limit,
    totalCount: count ?? 0,
  };
}
