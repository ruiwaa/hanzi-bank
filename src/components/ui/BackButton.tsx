"use client";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
  page?: string;
  level?: (typeof HSK_LEVELS)[number];
}

export default function BackButton({ text, page, level }: Props) {
  const router = useRouter();
  const handleBack = () => {
    if (page) {
      router.push(page);
    } else {
      router.back();
    }
  };
  return (
    <div>
      <button
        onClick={handleBack}
        className={`flex items-center cursor-pointer transition-transform duration-200 hover:-translate-x-2 ${
          text ? "text-primary" : level?.textClass
        }`}
      >
        <ChevronLeft
          aria-label="급수별 단어 목록 페이지로 이동하기"
          strokeWidth={4}
        />
        {text && <span className="font-semibold">{text}</span>}
      </button>
    </div>
  );
}
