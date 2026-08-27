import { supabase } from "@/lib/supabase/client";

export interface updateUSerEmailParams {
  email: string;
}

/**
 * 사용자 이메일 수정합니다.
 *
 * @param email - 사용자 이메일
 * @returns 수정된 이메일
 */

export async function updateUserEmail({ email }: updateUSerEmailParams) {
  const { data, error } = await supabase.auth.updateUser({
    email: email.trim(),
  });

  if (error) throw error;

  return data;
}
