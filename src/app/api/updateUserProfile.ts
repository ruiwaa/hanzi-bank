import { supabase } from "@/lib/supabase/client";

export interface UpdateUserProfileParams {
  id: string;
  nickname: string;
  profile_image?: string | null;
}

/**
 * 사용자의 프로필 정보와 닉네임 정보를 수정합니다.
 * users 테이블의 프로필 정보와 users_nickname 테이블의 닉네임을 함께 업데이트합니다.
 *
 * @param id - 프로필을 수정할 사용자의 ID
 * @param nickname - 변경할 새로운 닉네임
 * @param profile_image - 변경할 프로필 이미지 URL (선택 사항)
 * @returns 수정된 사용자 프로필 데이터
 */

export async function updateUserProfile({
  id,
  nickname,
  profile_image,
}: UpdateUserProfileParams) {
  const { data, error } = await supabase
    .from("users")
    .update({
      nickname,
      profile_image,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  const { error: nicknameError } = await supabase
    .from("users_nickname")
    .update({
      user_nickname: nickname,
    })
    .eq("id", id);

  if (nicknameError) throw nicknameError;

  return data;
}
