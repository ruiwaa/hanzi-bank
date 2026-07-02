"use client";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSession() {
  // 사용자 정보 저장하기
  const [user, setUser] = useState<User | null>(null);

  // 최초 마운트 되었을 때 유저 정보 가져오기
  useEffect(() => {
    // 슈파베이스에서 해당 유저 정보 가져오기
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 가져오고 나서 그 유저로 상태 업데이트
      setUser(user);
    };
    getUser();

    // 로그인/로그아웃 등 인증상태가 변경 될 때마다 user 상태 최신 유지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // _event는 SIGNED_IN, SIGNED_OUT 등의 이벤트가 전달되지만
      // 현재는 사용하지 않기 때문에 '_'를 붙여 의도적으로 무시함
      setUser(session?.user ?? null);
    });

    // 컴포넌트가 사라질 때 클린업 함수를 실행 시켜 부수 효과 방지
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user };
}
