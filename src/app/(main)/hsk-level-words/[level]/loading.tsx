import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-2">
      <Loader2 className="animate-spin" />
      <p>로딩 중...</p>
    </div>
  );
}
