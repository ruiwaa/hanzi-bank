import { supabase } from "@/lib/supabase/client";

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
