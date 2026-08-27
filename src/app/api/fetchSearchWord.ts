import { supabase } from "@/lib/supabase/client";
import { HskWord } from "@/types/DBTypes";

export interface SearchProps {
  words: HskWord[];
  page: number;
  limit: number;
  totalCount: number;
}

export type SortSearchOption = "frequency" | "relevance";

/**
 * 검색어와 정렬 옵션을 기준으로 검색한 결과의 HSK 단어를 조회합니다.
 *
 * @param keyword - 검색할 중국어 단어 또는 한국어 뜻
 * @param page - 조회할 페이지 번호
 * @param limit - 한 페이지에 조회할 단어 개수
 * @param sort - 검색 결과 정렬 방식 (관련도순 또는 빈도순)
 * @returns 검색된 단어 목록, 페이지 정보, 전체 검색 결과 개수
 */

export async function fetchSearchWords(
  keyword: string,
  page: number,
  limit: number,
  sort: SortSearchOption,
): Promise<SearchProps> {
  "use cache";

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  console.log("SORT:", sort);

  // 관련도순
  if (sort === "relevance") {
    const { data, error } = await supabase.rpc("search_hsk_words", {
      search_keyword: keyword,
      page_offset: from,
      page_limit: limit,
    });

    if (error) {
      throw new Error(error.message);
    }

    // totalCount는 별도로 구해야 함
    const { count, error: countError } = await supabase
      .from("hsk_words")
      .select("*", { count: "exact", head: true })
      .or(`word.ilike.%${keyword}%,meaning_ko.ilike.%${keyword}%`);

    if (countError) {
      throw new Error(countError.message);
    }

    return {
      words: data ?? [],
      page,
      limit,
      totalCount: count ?? 0,
    };
  }

  // 빈도순
  const query = supabase
    .from("hsk_words")
    .select("*", { count: "exact" })
    .or(`word.ilike.%${keyword}%,meaning_ko.ilike.%${keyword}%`)
    .order("frequency", { ascending: true });

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    words: data ?? [],
    page,
    limit,
    totalCount: count ?? 0,
  };
}
