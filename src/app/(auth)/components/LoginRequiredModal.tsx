"use client";
import { useLoginModal } from "@/stores/loginModalStore";
import { Hand } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function LoginRequiredModal() {
  // 모달창 내 포커스 트랩을 위한 값
  const modalRef = useRef<HTMLDivElement>(null);
  // 모달창이 열리면 첫번째 버튼 요소 값
  const firstButtonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, close } = useLoginModal();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      firstButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMoveToLogin = () => {
    router.push("/login");
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key !== "Tab") return;
    if (!modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll("button");
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    if (focusableElements.length === 0) return;
    if (document.activeElement === firstEl && e.shiftKey) {
      e.preventDefault();
      lastEl.focus();
    }
    if (document.activeElement === lastEl && !e.shiftKey) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40 "
      onClick={close}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white p-10 flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-semibold flex items-center gap-2">
          <Hand className="animate-wave" />
          로그인 후 서비스를 이용하실 수 있습니다.
        </span>
        <div className="flex flex-row gap-2">
          <button
            ref={firstButtonRef}
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
