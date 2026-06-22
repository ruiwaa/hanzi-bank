"use server";
import { fetchTodayWords } from "@/app/(auth)/api/fetchTodayWords";
import { Speech } from "lucide-react";

export default async function TodayWord() {
  const todayWords = await fetchTodayWords();
  console.log(todayWords);

  return (
    <div className="bg-linear-to-br from-slate-50 to-blue-100 h-80 p-5 rounded-2xl">
      <h2 className="flex flex-row gap-2 text-primary font-semibold">
        <Speech />
        <span>오늘의 단어</span>
      </h2>
    </div>
  );
}
