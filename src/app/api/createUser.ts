import { supabase } from "@/lib/supabase/client";

interface createUserType {
  id: string;
  email: string;
  hskLevel: number | null;
}

/**
 * 신규 유저를 생성하는 API
 * @param {createUserType} user - 생성할 유저의 정보 객체
 * @param {string} user.id - 유저의 고유 ID (Auth ID 등)
 * @param {string} user.email - 유저 이메일 (닉네임 추출에 사용됨)
 * @param {number | null} user.hskLevel - 유저의 HSK 등급 (선택 사항)
 * @returns
 */

export async function createUser({ id, email, hskLevel }: createUserType) {
  const nickname = email.split("@")[0];

  const { data, error: userError } = await supabase.from("users").insert({
    id,
    email,
    hsk_level: hskLevel ?? null,
    nickname,
  });

  if (userError) throw userError;

  return data;
}
