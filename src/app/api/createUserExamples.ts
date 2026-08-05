import { supabase } from "@/lib/supabase/client";

interface CreateUserExampleParams {
  userId: string;
  wordId: string;
  sentence: string;
  meaning: string;
}

export async function createUserExample({
  userId,
  wordId,
  sentence,
  meaning,
}: CreateUserExampleParams) {
  const { data, error } = await supabase
    .from("user_examples")
    .insert([
      {
        user_id: userId,
        word_id: wordId,
        sentence,
        sentence_pinyin: "",
        meaning,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
