import { supabase } from "@/lib/supabase/client";

/**
 * 이메일과 비밀번호를 사용하여 Supabase Auth 로그인을 수행합니다.
 *
 * @param email - 로그인에 사용할 사용자 이메일
 * @param password - 로그인에 사용할 사용자 비밀번호
 * @returns Supabase Auth에서 반환된 로그인 결과 데이터
 */

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}
