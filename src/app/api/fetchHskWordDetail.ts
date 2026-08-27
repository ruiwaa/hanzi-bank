import { supabase } from "@/lib/supabase/client";

/**
 * 해당 단어의 정보를 조회합니다.
 * (단어, 단어의 뜻, 한어병음, 예문 등 )
 * @param id 단어의 고유 아이디
 * @returns
 */
export async function fetchHskWordDetail(id: string) {
  const { data, error } = await supabase
    .from("hsk_words")
    .select(`*,word_examples(*)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}
