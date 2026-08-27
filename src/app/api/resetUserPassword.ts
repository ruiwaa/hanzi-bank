import { supabase } from "@/lib/supabase/client";

/**
 * 사용자가 비밀번호 재변경을 원할 시,
 * 사용자의 이메일 주소에 인증 메일을 발송하여,
 * 해당 링크를 통해 비밀번호를 재설정할 수 있습니다.
 *
 * @param email 저장되어있는 사용자의 이메일 주소
 * @returns 인증 메일을 통해, 비밀번호 재설정 페이지로 이동
 */
export async function resetUserPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/resetPassword`,
  });

  if (error) throw error;

  return data;
}
