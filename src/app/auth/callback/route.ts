import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 기존에 저장된 사용자인지 확인
  const { data: existingUser, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (userError) throw userError;

  // 새로운 사용자일 경우 서버 supabase에서 유저 정보 등록시켜주기
  // route.ts가 서버에서 실행되기 때문에 서버용 client 사용해야 함

  if (!existingUser) {
    const nickname = user.email.split("@")[0];

    const { error: insertError } = await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      nickname,
      hsk_level: null,
    });

    if (insertError) {
      console.error(insertError);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}
