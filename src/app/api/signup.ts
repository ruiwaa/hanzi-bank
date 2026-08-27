import { supabase } from "@/lib/supabase/client";
import { createUser } from "./createUser";

interface signupType {
  email: string;
  password: string;
  hskLevel: number;
}

/**
 * 이메일과 비밀번호를 사용하여 회원가입을 수행합니다.
 * Supabase Auth에 사용자를 생성한 후 애플리케이션의 사용자 정보를 생성합니다.
 *
 * @param email - 회원가입에 사용할 사용자 이메일
 * @param password - 회원가입에 사용할 사용자 비밀번호
 * @param hskLevel - 사용자가 설정할 중국어 학습 HSK 급수
 * @returns Supabase Auth에서 반환된 회원가입 결과 데이터
 */

export async function signup({ email, password, hskLevel }: signupType) {
  // auth.users 생성
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error("회원가입에 실패했습니다.");
  }

  // users 생성
  await createUser({
    id: data.user.id,
    email,
    hskLevel,
  });

  return data;
}
