import { supabase } from "@/lib/supabase/client";

export async function updateUserPassword(new_password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: new_password,
  });

  if (error) throw error;

  return data;
}
