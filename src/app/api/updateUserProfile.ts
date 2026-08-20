import { supabase } from "@/lib/supabase/client";

export interface UpdateUserProfileParams {
  id: string;
  nickname: string;
  profile_image?: string | null;
}

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
