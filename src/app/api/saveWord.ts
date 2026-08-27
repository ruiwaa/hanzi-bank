import { supabase } from "@/lib/supabase/client";

/**
 * 로그인한 사용자가 중단어를 저장할 시,
 * user_words DB에 단어가 저장됩니다.
 *
 * @param userId 유저 아이디
 * @param wordId 중단어 아이디
 */

export async function saveWord(userId: string, wordId: string) {
  const { error } = await supabase.from("user_words").insert({
    user_id: userId,
    word_id: wordId,
  });

  if (error) throw error;
}
