"use client";

import { useMyWords } from "@/hooks/useMywords";
import { useSession } from "@/hooks/useSession";
import MyWordCard from "./MyWordCard";
import { Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function MyWordSection() {
  const { user } = useSession();
  const { data: myWords = [], isLoading } = useMyWords(user?.id);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");

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
        <div>
          <div className="flex flex-row gap-2">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-30">
                <SelectValue placeholder="급수 선택" />
              </SelectTrigger>
              <SelectContent className="text-center">
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="1">HSK 1급</SelectItem>
                <SelectItem value="2">HSK 2급</SelectItem>
                <SelectItem value="3">HSK 3급</SelectItem>
                <SelectItem value="4">HSK 4급</SelectItem>
                <SelectItem value="5">HSK 5급</SelectItem>
                <SelectItem value="6">HSK 6급</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ul className="mt-4 space-y-4 bg-white p-4 rounded-2xl border border-gray-200">
            {myWords.map((item) => (
              <MyWordCard key={item.hsk_words.id} word={item} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
