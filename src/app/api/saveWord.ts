import { supabase } from "@/lib/supabase/client";

export async function saveWord(userId: string, wordId: string) {
  const { error } = await supabase.from("user_words").insert({
    user_id: userId,
    word_id: wordId,
  });

  if (error) throw error;
}
