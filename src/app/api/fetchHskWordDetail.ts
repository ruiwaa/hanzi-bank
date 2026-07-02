import { supabase } from "@/lib/supabase";

export async function fetchHskWordDetail(id: string) {
  const { data, error } = await supabase
    .from("hsk_words")
    .select(`*,word_examples(*)`)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }
  return data;
}
