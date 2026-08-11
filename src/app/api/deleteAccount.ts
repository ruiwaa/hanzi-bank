import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function deleteAccount() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

  if (error) {
    throw error;
  }

  return { success: true };
}
