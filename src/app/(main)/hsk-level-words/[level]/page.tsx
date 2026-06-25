import { fetchAllHskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import Pagination from "@/components/ui/Pagination";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import DetailHskLevelList from "./components/DetailHskLevelList";
import HskLevelWordsHeader from "./components/HskLevelWordsHeader";
import BackButton from "@/components/ui/BackButton";

export default async function HskLevelDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ page: number; limit: number }>;
}) {
  const { level } = await params;
  const { page = 1, limit = 10 } = await searchParams;
  const currentPage = Number(page);
  const currentlimit = Number(limit);
  const words = await fetchAllHskLevelWords(
    Number(level),
    currentPage,
    currentlimit,
  );
  const totalPages = Math.ceil(words.totalCount / limit);
  const levelData = HSK_LEVELS.find((h) => String(h.level) === String(level));

  return (
    <div className="container-layout flex flex-col overflow-y-auto">
      <div className="flex flex-row gap-2 items-center">
        <h2 className={`font-bold ${levelData?.textClass} flex flex-row gap-2`}>
          <BackButton page={`/hsk-level-words`} />
          {levelData?.label} 단어 목록
        </h2>
        <span
          className={`px-2 py-1 ${levelData?.bgClass} ${levelData?.textClass} rounded-xl w-20 text-center font-semibold`}
        >
          {levelData?.label}
        </span>
      </div>
      <HskLevelWordsHeader />
      <ol className="p-2">
        <DetailHskLevelList words={words} />
      </ol>
      <Pagination page={currentPage} totalPages={totalPages} />
    </div>
  );
}
