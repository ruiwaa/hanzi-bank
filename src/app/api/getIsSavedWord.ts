import { supabase } from "@/lib/supabase/client";

interface Params {
  userId: string;
  wordId: string;
}

export async function getIsSaveWord({ userId, wordId }: Params) {
  const { data, error } = await supabase
    .from("user_words")
    .select("word_id")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .maybeSingle();

  if (error) throw error;
  return data;
}
