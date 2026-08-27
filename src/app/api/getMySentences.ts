import { supabase } from "@/lib/supabase/client";
import { MySentenceResponse } from "@/types/DBTypes";

export interface GetMySentenceParams {
  userId: string;
  page: number;
  pageSize: number;
  level: "all" | 1 | 2 | 3 | 4 | 5 | 6;
  sort: "latest" | "oldest";
}

/**
 * 사용자가 작성한 예문을 조회합니다.
 * HSK 급수와 정렬 기준으로 필터링하며 페이지네이션을 지원합니다.
 *
 * @param userId - 예문을 조회할 사용자 ID
 * @param page - 조회할 페이지 번호 (기본값: 1)
 * @param pageSize - 페이지당 조회할 예문 개수 (기본값: 20)
 * @param level - HSK 급수 필터 (`all`: 전체, `1`~`6`: 해당 급수)
 * @param sort - 예문 정렬 기준 (`latest`: 최신순, `oldest`: 오래된순)
 * @returns 예문 목록과 전체 예문 개수, 페이지네이션 정보를 포함한 객체
 */

export async function getMySentences({
  userId,
  page = 1,
  pageSize = 20,
  level = "all",
  sort = "latest",
}: GetMySentenceParams): Promise<MySentenceResponse> {
  let query = supabase
    .from("user_examples")
    .select(
      `
  id,
  created_at,
  sentence,
  sentence_pinyin,
  meaning,
  hsk_words!inner(
    id,
    word,
    pinyin,
    meanings,
    hsk_level
  )
  `,
      { count: "exact" },
    )
    .eq("user_id", userId);

  if (level !== "all") {
    query = query.eq("hsk_words.hsk_level", level);
  }

  query = query.order("created_at", {
    ascending: sort === "oldest",
  });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  const items = (data ?? []).map((item) => {
    const word = Array.isArray(item.hsk_words)
      ? item.hsk_words[0]
      : item.hsk_words;

    return {
      id: item.id,
      created_at: item.created_at,
      sentence: item.sentence,
      sentence_pinyin: item.sentence_pinyin,
      meaning: item.meaning,
      hsk_words: {
        id: word.id,
        word: word.word,
        pinyin: word.pinyin,
        meanings: word.meanings,
        hsk_level: word.hsk_level,
      },
    };
  });

  return {
    items,
    totalCount: count ?? 0,
    page,
    pageSize,
  };
}
