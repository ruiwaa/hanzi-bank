import { supabase } from "@/lib/supabase/client";

export interface SyncUserEmailParams {
  userId: string;
  email: string;
}

export async function syncUserEmail({ userId, email }: SyncUserEmailParams) {
  const { data, error } = await supabase
    .from("users")
    .update({
      email,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
