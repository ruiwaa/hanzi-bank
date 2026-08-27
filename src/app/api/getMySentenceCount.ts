import { supabase } from "@/lib/supabase/client";

/**
 * 유저가 작성한 예문의 총 개수를 조회합니다.
 * @param {string} userId - DB에 저장되어있는 유저 고유 아이디
 * @returns 유저가 작성한 총 예문 개수
 */

export async function getMySentenceCount(userId: string) {
  const { count, error } = await supabase
    .from("user_examples")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}
