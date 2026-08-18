"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import ResetPasswordForm from "./ResetPasswordForm";
import { Loader2 } from "lucide-react";

export default function ResetPasswordAuth() {
  const [isRecovery, setIsRecovery] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("AUTH EVENT:", event);
      console.log("SESSION:", session);

      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }

      setIsChecking(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isChecking) {
    return (
      <Loader2
        className="animate-spin"
        aria-label="비밀번호 재설정 입력칸 불러오는 중"
      />
    );
  }

  if (!isRecovery) {
    return (
      <p className="text-xl text-red-600 font-semibold">
        유효하지 않은 비밀번호 재설정 링크입니다.
      </p>
    );
  }

  return <ResetPasswordForm />;
}
