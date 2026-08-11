import { supabase } from "@/lib/supabase/client";

export interface updateUSerEmailParams {
  email: string;
}

export async function updateUserEmail({ email }: updateUSerEmailParams) {
  const { data, error } = await supabase.auth.updateUser({
    email: email.trim(),
  });

  if (error) throw error;

  return data;
}
