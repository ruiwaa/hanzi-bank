import { supabase } from "@/lib/supabase";
import { HskWord } from "@/types/DBTypes";

export interface SearchProps {
  words: HskWord[];
  page: number;
  limit: number;
  totalCount: number;
}

export async function fetchSearchWords(
  keyword: string,
  page: number,
  limit: number,
): Promise<SearchProps> {
  "use cache";
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("hsk_words")
    .select("*", { count: "exact" })
    .or(`word.ilike.%${keyword}%,meaning_ko.ilike.%${keyword}%`);

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    words: data,
    page,
    limit,
    totalCount: count ?? 0,
  };
}
