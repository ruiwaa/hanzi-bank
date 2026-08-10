"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useSyncUserEmail } from "@/hooks/useSyncUserEmail";

export function useSyncAuthEmail() {
  const { mutate: syncUserEmail } = useSyncUserEmail();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "USER_UPDATED" && session?.user.email) {
        syncUserEmail({
          userId: session.user.id,
          email: session.user.email,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncUserEmail]);
}
