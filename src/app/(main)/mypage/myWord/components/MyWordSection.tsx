"use client";

import { useMyWords } from "@/hooks/useMywords";
import { useSession } from "@/hooks/useSession";
import MyWordCard from "./MyWordCard";

export default function MyWordSection() {
  const { user } = useSession();
  const { data: myWords = [], isLoading } = useMyWords(user?.id);

  if (isLoading) {
    return <p className="mx-auto">불러오는 중...</p>;
  }

  return (
    <>
      {myWords.length === 0 ? (
        <p>저장된 단어가 없습니다.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {myWords.map((item) => (
            <MyWordCard key={item.hsk_words.id} word={item} />
          ))}
        </ul>
      )}
    </>
  );
}
