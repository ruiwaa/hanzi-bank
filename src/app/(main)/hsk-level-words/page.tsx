import { fetchHskLevelCounts } from "@/app/api/fetchHskLevelCounts";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function HskLevelPage() {
  const counts = await Promise.all(
    HSK_LEVELS.map((level) => fetchHskLevelCounts(level.level)),
  );

  return (
    <div className="max-w-full min-h-screen container-layout">
      <h2 className="font-semibold text-2xl mb-2">급수별 단어 목록</h2>
      <span className="text-muted-foreground">
        전체 급수별 중단어를 학습해보세요.
      </span>
      <div className="h-full mt-5">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  lg:aspect-auto gap-5 w-full">
          {HSK_LEVELS.map((levels) => (
            <li key={levels.level}>
              <Link
                href={`/hsk-level-words/${levels.level}`}
                className={`${levels.bgClass} ${levels.textClass} shadow-md rounded-xl flex flex-col p-5 gap-3 transition-transform duration-200 hover:scale-105 `}
              >
                <div className="flex justify-between">
                  <span
                    className={`p-1 border-2 ${levels.borderClass} rounded-xl w-20 text-center font-semibold`}
                  >
                    {levels.label}
                  </span>
                  <button className="cursor-pointer transition-transform duration-300 hover:translate-x-2">
                    <ArrowRight aria-label="학습하러 가기" />
                  </button>
                </div>
                <div className="flex flex-row gap-3">
                  <BookOpen className="bg-white  rounded-lg p-2" size={50} />
                  <h3 className="self-center font-bold">{levels.label} 단어</h3>
                </div>
                <span>
                  총{" "}
                  <strong>
                    {
                      counts.find((count) => count.level === levels.level)
                        ?.count
                    }
                  </strong>
                  개의 단어
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
