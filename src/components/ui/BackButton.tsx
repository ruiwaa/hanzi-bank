"use client";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  showText?: boolean;
  page: string;
  level?: (typeof HSK_LEVELS)[number];
}

export default function BackButton({ showText = false, page, level }: Props) {
  const router = useRouter();
  return showText ? (
    <div>
      <button
        onClick={() => router.push(page)}
        className={`flex flex-row cursor-pointer text-primary transition-transform duration-200 hover:-translate-x-2 `}
      >
        <ChevronLeft
          aria-label="급수별 단어 목록 페이지로 이동하기"
          strokeWidth={4}
        />
        <span className="font-semibold">뒤로 가기</span>
      </button>
    </div>
  ) : (
    <button
      onClick={() => router.push(page)}
      className={`flex items-center  cursor-pointer transition-transform duration-200 hover:-translate-x-2  ${level?.textClass}`}
    >
      <ChevronLeft
        aria-label="급수별 단어 목록 페이지로 이동하기"
        size={32}
        strokeWidth={4}
      />
    </button>
  );
}
