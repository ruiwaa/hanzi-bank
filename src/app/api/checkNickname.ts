import { supabase } from "@/lib/supabase/client";

/**
 * 닉네임 중복 여부를 확인을 위해
 * 사용되는 api 함수
 * @param nickname 사용자의 닉네임
 * @param id  사용자의 id
 * @returns
 */

export async function checkNickname(nickname: string, id: string) {
  const { data, error } = await supabase
    .from("users_nickname")
    .select("id")
    .eq("user_nickname", nickname.trim())
    .neq("id", id)
    .limit(1);

  if (error) {
    console.error("checkNickname error:", error);
    throw error;
  }

  console.log("checkNickname data:", data);

  return data.length > 0;
}
