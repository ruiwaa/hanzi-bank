"use client";

import { useSyncAuthEmail } from "@/hooks/useSyncAuthEmail";

export default function AuthEmailSync() {
  useSyncAuthEmail();

  return null;
}
