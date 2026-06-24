"use client";
import { MainLevelWords } from "@/app/api/fetchMainLevelWord";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { Bookmark, Volume2 } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import SaveWordBtn from "./SaveWordBtn";

interface Props {
  levelWords: MainLevelWords[];
}
export default function HskLevelCardList({ levelWords }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const selectedWords =
    levelWords.find((word) => word.level === selectedLevel)?.words ?? [];
  const handleLevelWords = (e: MouseEvent<HTMLButtonElement>) => {
    setSelectedLevel(Number(e.currentTarget.value));
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap md:flex-row gap-3">
        {HSK_LEVELS.map((levels) => (
          <button
            value={levels.level}
            type="button"
            key={levels.level}
            className={`rounded-xl bg-input px-3 py-2   whitespace-nowrap ${levels.hoverClass}  ${selectedLevel === levels.level ? "bg-primary text-white font-semibold" : ""}`}
            onClick={handleLevelWords}
            aria-pressed={selectedLevel === levels.level}
          >
            {levels.label}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-1 gap-2 ">
        {selectedWords.map((word) => (
          <div
            key={word.id}
            className="flex flex-col md:flex-row items-center md:items-start bg-white border border-slate-300 rounded-xl gap-2 md:gap-4 p-3 md:p-6"
          >
            <span className="bg-blue-200 text-primary p-1 w-10 rounded-xl self-center text-center font-semibold">
              {word.hsk_level}급{" "}
            </span>
            <div className="flex flex-col flex-1 gap-2 py-2 md:justify-center group">
              <h3 className="font-chinese font-semibold text-center md:text-left  group-hover:text-primary ">
                {word.word}{" "}
                <span className="text-muted-foreground group-hover:text-primary ">
                  [{word.pinyin}]
                </span>
              </h3>
              <span className="self-center md:self-start group-hover:text-primary ">
                {word.meanings[0].ko}
              </span>
            </div>
            <Link
              className="text-primary self-center hover:bg-input hover:rounded-xl p-2"
              href={""}
            >
              보기
            </Link>
            {/* 비회원 일 경우 로그인 요청 모달창 표시 */}
            {/* 이미 저장된 단어일 경우 아이콘 색깔이 꽉 채워지게 설정 */}
            {/* 저장됨을 안내해주는 aria-label 삼항 연산자로 표시해줘야함 */}
            <div className="flex justify-between md:flex-row md:justify-center md:items-center gap-2 h-full ">
              <SaveWordBtn />
              <button
                aria-label={`중단어 ${word.word} 발음 듣기`}
                className="hover:text-primary text-muted-foreground"
              >
                <Volume2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
