"use client";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  text?: string;
  href?: string;
  level?: (typeof HSK_LEVELS)[number];
  ariaLabel?: string;
}

export default function BackButton({
  text,
  href,
  level,
  ariaLabel = "이전 페이지로 이동",
}: Props) {
  const router = useRouter();
  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };
  return (
    <button
      type="button"
      onClick={handleBack}
      className={`flex items-center cursor-pointer transition-transform duration-200 hover:-translate-x-2 ${
        text ? "text-primary" : level?.textClass
      }`}
      aria-label={ariaLabel}
    >
      <ChevronLeft strokeWidth={4} />
      {text && <span className="font-semibold">{text}</span>}
    </button>
  );
}
