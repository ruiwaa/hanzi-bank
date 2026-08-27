import { supabase } from "@/lib/supabase/client";

export interface UserHsklevel {
  id: string;
  hsk_level: number;
}

/**
 * 사용자의 수정된 중국어 급수로 변경합니다.
 * @param id - 급수 아이디
 * @param hsk_level - 수정할 급수 아이디
 * @returns 선택한 중단어 급수 DB 갱신
 */

export async function updateUserLevel({ id, hsk_level }: UserHsklevel) {
  const { data, error } = await supabase
    .from("users")
    .update({ hsk_level })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
