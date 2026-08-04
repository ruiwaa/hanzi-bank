import { supabase } from "@/lib/supabase/client";
import { MyWord } from "@/types/DBTypes";

export async function getMyWords(userId: string): Promise<MyWord[]> {
  const { data, error } = await supabase
    .from("user_words")
    .select(
      `
      saved_at,
      hsk_words!user_words_word_id_fkey (
        id,
        word,
        pinyin,
        meanings,
        hsk_level
      )
    `,
    )
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((item) => {
    const word = Array.isArray(item.hsk_words)
      ? item.hsk_words[0]
      : item.hsk_words;

    return {
      saved_at: item.saved_at,
      hsk_words: {
        id: word.id,
        word: word.word,
        pinyin: word.pinyin,
        meanings: word.meanings,
        hsk_level: word.hsk_level,
      },
    };
  });
}
