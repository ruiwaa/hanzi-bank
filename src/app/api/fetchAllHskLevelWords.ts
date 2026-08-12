"use cache";

import { supabase } from "@/lib/supabase/client";
import { HskWord } from "@/types/DBTypes";
import { cacheLife } from "next/cache";

export interface HskLevelWords {
  level: number;
  words: HskWord[];
  page: number;
  limit: number;
  totalCount: number;
}

export type SortOption = "frequency" | "latest";

export async function fetchAllHskLevelWords(
  level: number,
  page: number,
  limit: number,
  sort: SortOption,
): Promise<HskLevelWords> {
  cacheLife("days");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("hsk_words")
    .select("*", { count: "exact" })
    .eq("hsk_level", level);

  if (sort === "frequency") {
    query.order("frequency", { ascending: true });
  }

  if (sort === "latest") {
    query.order("created_at", { ascending: false });
  }

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
