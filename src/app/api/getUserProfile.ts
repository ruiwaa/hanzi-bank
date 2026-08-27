import { supabase } from "@/lib/supabase/client";

/**
 * 유저 프로필 정보를 조회합니다
 * @param userId 조회할 사용자 ID
 * @returns 조회된 사용자의 정보 객체
 */
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}
