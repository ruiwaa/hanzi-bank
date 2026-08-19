import { supabase } from "@/lib/supabase/client";
import { createUser } from "./createUser";

interface signupType {
  email: string;
  password: string;
  hskLevel: number;
}

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
