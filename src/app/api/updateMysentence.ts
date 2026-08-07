import { supabase } from "@/lib/supabase/client";

export interface UpdateMySentenceParams {
  id: string;
  sentence: string;
  meaning: string;
}

export async function updateMySentence({
  id,
  sentence,
  meaning,
}: UpdateMySentenceParams) {
  const { data, error } = await supabase
    .from("user_examples")
    .update({
      sentence,
      meaning,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
