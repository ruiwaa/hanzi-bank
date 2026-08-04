"use client";

import { useMyWords } from "@/hooks/useMywords";
import { useSession } from "@/hooks/useSession";

export default function MyWord() {
  const { user } = useSession();
  const { data: myWords = [], isLoading } = useMyWords(user?.id);

  if (isLoading) {
    return <p className="mx-auto">불러오는 중...</p>;
  }

  return (
    <div className="desktop-layout">
      <h1 className="text-2xl font-bold">나의 단어</h1>

      {myWords.length === 0 ? (
        <p>저장된 단어가 없습니다.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {myWords.map((item) => {
            if (!item) return null;

            return (
              <li key={item.hsk_words.id}>
                <p>{item.hsk_words.word}</p>
                <p>{item.hsk_words.pinyin}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
