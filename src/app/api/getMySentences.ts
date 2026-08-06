import { supabase } from "@/lib/supabase/client";
import { MySentenceResponse } from "@/types/DBTypes";

export interface GetMySentenceParams {
  userId: string;
  page: number;
  pageSize: number;
  level: "all" | 1 | 2 | 3 | 4 | 5 | 6;
  sort: "latest" | "oldest";
}

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
