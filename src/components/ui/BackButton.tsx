"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  showText?: boolean;
  page: string;
}

export default function BackButton({ showText = false, page }: Props) {
  const router = useRouter();
  return showText ? (
    <div className="flex flex-row gap-3">
      <button
        onClick={() => router.push(page)}
        className="self-baseline cursor-pointer transition-transform duration-200 hover:-translate-x-2 "
      >
        <ChevronLeft
          aria-label="급수별 단어 목록 페이지로 이동하기"
          strokeWidth={4}
        />
      </button>
      <span>뒤로 가기</span>
    </div>
  ) : (
    <button
      onClick={() => router.push(page)}
      className="self-baseline cursor-pointer transition-transform duration-200 hover:-translate-x-2 "
    >
      <ChevronLeft
        aria-label="급수별 단어 목록 페이지로 이동하기"
        strokeWidth={4}
      />
    </button>
  );
}
