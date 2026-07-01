"use client";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useSession() {
  // 사용자 정보 저장하기
  const [user, setUser] = useState<User | null>(null);

  // 유저 정보 가져오기
  useEffect(() => {
    // 슈파베이스에서 해당 유저 정보 가져오기
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 가져오고 나서 그 유저로 상태 업데이트
      setUser(user);
    };
    // 함수 실행
    getUser();
  }, []);

  return { user };
}
