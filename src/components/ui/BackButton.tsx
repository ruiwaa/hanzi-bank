"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/hsk-level-words")}
      className="self-baseline cursor-pointer transition-transform duration-200 hover:-translate-x-2 "
    >
      <ChevronLeft
        aria-label="급수별 단어 목록 페이지로 이동하기"
        strokeWidth={4}
      />
    </button>
  );
}
