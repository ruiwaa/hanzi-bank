import { supabase } from "@/lib/supabase/client";
import { MyWordResponse } from "@/types/DBTypes";

export interface GetMyWordsParams {
  userId: string;
  page: number;
  pageSize: number;
  level: "all" | 1 | 2 | 3 | 4 | 5 | 6;
  sort: "latest" | "oldest";
}

export async function getMyWords({
  userId,
  page = 1,
  pageSize = 20,
  level = "all",
  sort = "latest",
}: GetMyWordsParams): Promise<MyWordResponse> {
  let query = supabase
    .from("user_words")
    .select(
      `
  saved_at,
  hsk_words!user_words_word_id_fkey (
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

  query = query.order("saved_at", { ascending: sort === "oldest" });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;
  if (error) {
    console.log(error);
    throw error;
  }
  const items = (data ?? []).map((item) => {
    const word = Array.isArray(item.hsk_words)
      ? item.hsk_words[0]
      : item.hsk_words;

    return {
      saved_at: item.saved_at,
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
