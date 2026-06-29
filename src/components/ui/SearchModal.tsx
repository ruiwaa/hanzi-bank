"use client";

import { useSearchModal } from "@/stores/searchModalStore";

export default function SearchModal() {
  const { isOpen, close } = useSearchModal();
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center "
      onClick={close}
    >
      <div
        className="w-full bg-amber-200 rounded-2xl p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h2>단어 검색</h2>
        </div>
      </div>
    </div>
  );
}
