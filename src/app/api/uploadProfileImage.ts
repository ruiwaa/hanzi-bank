import { supabase } from "@/lib/supabase/client";

/**
 * 사용자의 프로필 이미지를 Supabase Storage에 업로드합니다.
 * 업로드된 이미지의 공개 URL을 반환합니다.
 *
 * @param userId - 프로필 이미지를 업로드할 사용자의 ID
 * @param file - 업로드할 프로필 이미지 파일
 * @returns 업로드된 프로필 이미지의 공개 URL
 */

export async function uploadProfileImage(userId: string, file: File) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/profile.${fileExt}?${Date.now()}`;

  const { error } = await supabase.storage
    .from("profile_image")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("profile_image")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
