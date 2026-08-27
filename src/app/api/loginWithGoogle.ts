import { supabase } from "@/lib/supabase/client";
/**
 * 구글 계정을 통해 중단어 창고 사이트에 로그인 수행합니다.
 * @returns 로그인 결과 데이터
 */
export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
