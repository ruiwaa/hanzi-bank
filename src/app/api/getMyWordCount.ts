import { supabase } from "@/lib/supabase/client";

/**
 * 사용자가 저장한 중단어 총 개수를 조회합니다.
 @param userId - 단어를 조회할 사용자 ID
 * @returns 사용자가 저장한 단어 총 개수
 */
export async function getMyWordCount(userId: string) {
  const { count, error } = await supabase
    .from("user_words")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}
