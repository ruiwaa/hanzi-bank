import { supabase } from "@/lib/supabase/client";

export async function getMyWordCount(userId: string) {
  const { count, error } = await supabase
    .from("user_words")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}
