import { supabase } from "@/lib/supabase/client";

export async function fetchUser(id: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}
