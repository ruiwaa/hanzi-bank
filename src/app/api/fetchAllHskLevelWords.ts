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

/**
 * 지정된 급수의 HSK 단어 목록을 페이징 및 정렬하여 가져옵니다.
 * Next.js 캐시가 적용되어 일 단위(`cacheLife("days")`)로 데이터가 유지됩니다.
 *
 * @param {number} level - 조회할 HSK 급수 (1~6 급)
 * @param {number} page - 요청할 현재 페이지 번호 (1부터 시작)
 * @param {number} limit - 한 페이지에 가져올 단어 개수 (페이지 크기)
 * @param {SortOption} sort - 정렬 기준 ('frequency': 빈도순, 'latest': 최신순)
 * @returns {Promise<HskLevelWords>} 페이징 정보와 단어 목록이 포함된 객체
 */

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
