import { supabase } from "@/lib/supabase/client";

/**
 *
 * @param CreateUserExampleParams - 생성할 예문 정보 객체
 * @param {string} userId - 유저 고유 아이디
 * @param {string} wordId - 중단어 고유 아이디
 * @param {string} sentence - 작성한 예문
 * @param {string} meaning - 작성한 예문의 의미 (한국어)
 * @returns
 */

interface CreateUserExampleParams {
  userId: string;
  wordId: string;
  sentence: string;
  meaning: string;
}

export async function createUserExample({
  userId,
  wordId,
  sentence,
  meaning,
}: CreateUserExampleParams) {
  const { data, error } = await supabase
    .from("user_examples")
    .insert([
      {
        user_id: userId,
        word_id: wordId,
        sentence,
        sentence_pinyin: "",
        meaning,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
