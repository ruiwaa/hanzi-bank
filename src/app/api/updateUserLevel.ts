import { supabase } from "@/lib/supabase/client";

export interface UserHsklevel {
  id: string;
  hsk_level: number;
}

export async function updateUserLevel({ id, hsk_level }: UserHsklevel) {
  const { data, error } = await supabase
    .from("users")
    .update({ hsk_level })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
