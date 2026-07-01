"use client";
import { useLoginModal } from "@/stores/loginModalStore";
import { Hand } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginRequiredModal() {
  const { isOpen, close } = useLoginModal();
  const router = useRouter();

  if (!isOpen) return null;

  const handleMoveToLogin = () => {
    router.push("/login");
    close();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 "
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-10 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-semibold flex items-center gap-2">
          <Hand className="animate-wave" />
          로그인 후 서비스를 이용하실 수 있습니다.
        </span>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleMoveToLogin}
            className="border border-primary p-2 rounded-xl hover:bg-blue-200/40 font-semibold transition-colors duration-200 "
          >
            로그인하기
          </button>
          <button
            onClick={close}
            className="border border-primary p-2 rounded-xl hover:bg-blue-200/40 font-semibold transition-colors duration-200"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
