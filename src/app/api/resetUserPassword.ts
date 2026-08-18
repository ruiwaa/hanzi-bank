import { supabase } from "@/lib/supabase/client";

export async function resetUserPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/mypage/resetPassword`,
  });

  if (error) throw error;

  return data;
}
