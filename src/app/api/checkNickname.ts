import { supabase } from "@/lib/supabase/client";

export async function checkNickname(nickname: string, id: string) {
  const { data, error } = await supabase
    .from("users_nickname")
    .select("id")
    .eq("user_nickname", nickname.trim())
    .neq("id", id)
    .limit(1);

  if (error) {
    console.error("checkNickname error:", error);
    throw error;
  }

  console.log("checkNickname data:", data);

  return data.length > 0;
}
