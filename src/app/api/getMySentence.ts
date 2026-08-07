import { supabase } from "@/lib/supabase/client";

export async function getMySentenceCount(userId: string) {
  const { count, error } = await supabase
    .from("user_examples")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", userId);

  if (error) throw error;

  return count ?? 0;
}
