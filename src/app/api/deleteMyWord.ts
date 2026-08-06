import { supabase } from "@/lib/supabase/client";

export async function deleteMyWord(userId: string, wordId: string) {
  const { error } = await supabase
    .from("user_words")
    .delete()
    .eq("user_id", userId)
    .eq("word_id", wordId);
  if (error) throw error;
}
