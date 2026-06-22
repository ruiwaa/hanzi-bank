import { supabase } from "@/lib/supabase";

interface signupType {
  email: string;
  password: string;
  hskLevel: number;
}

export async function signup({ email, password, hskLevel }: signupType) {
  const { data } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!data.user) {
    throw new Error("회원가입에 실패했습니다.");
  }
  const nickname = email.split("@")[0];
  const { error: userError } = await supabase.from("users").insert({
    id: data.user?.id,
    email,
    hsk_level: hskLevel,
    nickname,
  });

  if (userError) throw userError;

  return data;
}
