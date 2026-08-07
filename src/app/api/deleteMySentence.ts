import { supabase } from "@/lib/supabase/client";

export async function deleteMySentence(userId: string, sentenceId: string) {
  const { error } = await supabase
    .from("user_examples")
    .delete()
    .eq("id", sentenceId);
  if (error) throw error;
}
