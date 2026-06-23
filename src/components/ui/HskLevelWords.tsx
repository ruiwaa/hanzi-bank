"use server";

import Link from "next/link";
import HskLevelCardList from "./HskLevelCardList";
import { fetchMainLevelWords } from "@/app/api/fetchMainLevelWord";

export default async function HskLevelWords() {
  const simpleLevelWords = await fetchMainLevelWords();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between mt-5">
        <h2 className="text-xl font-semibold">공부할 단어</h2>
        <Link href={"/hsk-level-words"}>
          <span className="text-primary">전체 보기</span>
        </Link>
      </div>
      <div className="flex flex-row gap-3">
        <HskLevelCardList levelWords={simpleLevelWords} />
      </div>
    </div>
  );
}
