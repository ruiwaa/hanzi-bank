"use client";

import { useMyWords } from "@/hooks/useMywords";
import { useSession } from "@/hooks/useSession";
import MyWordCard from "./MyWordCard";
import { Loader2Icon } from "lucide-react";

export default function MyWordSection() {
  const { user } = useSession();
  const { data: myWords = [], isLoading } = useMyWords(user?.id);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <Loader2Icon className="animate-spin" />
        <p> 불러오는 중...</p>
      </div>
    );
  }

  return (
    <>
      {myWords.length === 0 ? (
        <p>저장된 단어가 없습니다.</p>
      ) : (
        <ul className="mt-4 space-y-4 bg-white p-4 rounded-2xl border border-gray-200">
          {myWords.map((item) => (
            <MyWordCard key={item.hsk_words.id} word={item} />
          ))}
        </ul>
      )}
    </>
  );
}
