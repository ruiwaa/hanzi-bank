import { supabase } from "@/lib/supabase/client";

/**
 * 사용자의 비밀번호를 재설정합니다.
 * @param new_password - 재설정할 비밀번호
 * @returns 재설정한 비밀번호로 supabase.auth 업데이트
 */
export async function updateUserPassword(new_password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) throw error;

  return data;
}
