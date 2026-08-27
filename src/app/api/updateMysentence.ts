import { supabase } from "@/lib/supabase/client";

export interface UpdateMySentenceParams {
  id: string;
  sentence: string;
  meaning: string;
}

/**
 * 사용자가 작성한 예문을 수정합니다.
 *
 * @param id - 수정할 예문의 ID
 * @param sentence - 수정할 중국어 예문
 * @param meaning - 수정할 예문의 한국어 뜻
 * @returns 수정된 예문 데이터
 */

export async function updateMySentence({
  id,
  sentence,
  meaning,
}: UpdateMySentenceParams) {
  const { data, error } = await supabase
    .from("user_examples")
    .update({
      sentence,
      meaning,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
