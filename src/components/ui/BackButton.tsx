"use client";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="self-baseline cursor-pointer transition-transform duration-200 hover:-translate-x-2 "
    >
      <ChevronLeft aria-label="뒤로가기" strokeWidth={4} />
    </button>
  );
}
