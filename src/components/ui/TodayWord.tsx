"use server";
import { fetchTodayWords } from "@/app/api/fetchTodayWords";
import { Speech } from "lucide-react";
import TodayWordsSwiper from "./TodayWordSwiper";

export default async function TodayWord() {
  const todayWords = await fetchTodayWords();

  return (
    <div className="bg-linear-to-br from-blue-100 via-violet-50 to-pink-100 h-100 p-5 rounded-2xl flex flex-col">
      <h2 className="flex flex-row gap-2 text-primary font-semibold mb-4">
        <Speech size={30} />
        <span className="text-2xl">오늘의 단어</span>
      </h2>
      <TodayWordsSwiper words={todayWords} />
    </div>
  );
}
