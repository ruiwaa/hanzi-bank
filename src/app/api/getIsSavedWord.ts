import { supabase } from "@/lib/supabase/client";

interface Params {
  userId: string;
  wordId: string;
}

/**
 * 사용자가 로그인한 상태에서
 * 모든 단어의 저장여부를 확인합니다.
 * 저장 여부에 따라서 버튼의 디자인을 다르게 표시하기 위해 추가하였습니다.
 *
 * @param {string} userId - 유저 DB에 저장되어있는 고유아이디
 * @returns 저장 여부 (참/ 거짓) 반환
 */

export async function getIsSaveWord({ userId, wordId }: Params) {
  const { data, error } = await supabase
    .from("user_words")
    .select("word_id")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
