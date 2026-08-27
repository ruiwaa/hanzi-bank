import { supabase } from "@/lib/supabase/client";

export interface SyncUserEmailParams {
  userId: string;
  email: string;
}

/**
 * Supabase Auth의 사용자 이메일을 users 테이블의 이메일과 동기화합니다.
 *
 * @param userId - 이메일을 동기화할 사용자의 ID
 * @param email - 동기화할 사용자 이메일
 * @returns 이메일이 업데이트된 사용자 정보
 */

export async function syncUserEmail({ userId, email }: SyncUserEmailParams) {
  const { data, error } = await supabase
    .from("users")
    .update({
      email,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
