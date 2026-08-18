"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordAuth() {
  const [isRecovery, setIsRecovery] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!isRecovery) {
    return (
      <p className="text-black">유효하지 않은 비밀번호 재설정 링크입니다.</p>
    );
  }

  return <ResetPasswordForm />;
}
