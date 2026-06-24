import { fetchAllHskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import HskLevelWordsHeader from "./components/HskLevelWordsHeader";

export default async function HskLevelDetailPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const words = await fetchAllHskLevelWords(Number(level));
  const levelData = HSK_LEVELS.find((h) => String(h.level) === String(level));

  return (
    <div className="container-layout">
      <div className="flex flex-row gap-2 ">
        <h3 className={`font-bold ${levelData?.textClass} self-center `}>
          {levelData?.label} 단어 목록
        </h3>
        <span
          className={`px-2 py-1 ${levelData?.bgClass} ${levelData?.textClass} rounded-xl w-20 text-center font-semibold`}
        >
          {levelData?.label}
        </span>
      </div>
      <ol>
        <HskLevelWordsHeader />
        {words.words.map((word) => (
          <li key={word.id} className="flex flex-col px-2">
            <h4>{word.word}</h4>
          </li>
        ))}
      </ol>
    </div>
  );
}
