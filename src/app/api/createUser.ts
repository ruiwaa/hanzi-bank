import { supabase } from "@/lib/supabase/client";

interface createUserType {
  id: string;
  email: string;
  hskLevel: number | null;
}
export async function createUser({ id, email, hskLevel }: createUserType) {
  const nickname = email.split("@")[0];

  const { data, error: userError } = await supabase.from("users").insert({
    id,
    email,
    hsk_level: hskLevel ?? null,
    nickname,
  });

  if (userError) throw userError;

  return data;
}
