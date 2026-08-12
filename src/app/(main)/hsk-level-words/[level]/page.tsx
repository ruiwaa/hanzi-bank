import { fetchAllHskLevelWords } from "@/app/api/fetchAllHskLevelWords";
import Pagination from "@/components/ui/Pagination";
import { HSK_LEVELS } from "@/constants/hskLevelStyle";
import DetailHskLevelList from "./components/DetailHskLevelList";
import HskLevelWordsHeader from "./components/HskLevelWordsHeader";
import BackButton from "@/components/ui/BackButton";
import HskWordFilter from "./components/HskWordFilter";

export default async function HskLevelDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: string }>;
  searchParams: Promise<{ page: number; limit: number; sort: string }>;
}) {
  const { level } = await params;
  const {
    page = 1,
    limit = 10,
    sort: sortParam = "frequency",
  } = await searchParams;
  const currentPage = Number(page);
  const currentlimit = Number(limit);

  const words = await fetchAllHskLevelWords(
    Number(level),
    currentPage,
    currentlimit,
    sortParam === "latest" ? "latest" : "frequency",
  );
  const totalPages = Math.ceil(words.totalCount / limit);
  const levelData = HSK_LEVELS.find((h) => String(h.level) === String(level));

  return (
    <div className="container-layout flex flex-col px-0">
      <div className="w-fit flex items-center justify-between gap-1 mb-10">
        <div className="flex flex-row items-center gap-1">
          <BackButton href={`/hsk-level-words`} level={levelData} />
          <h2
            className={`font-bold ${levelData?.textClass} m-0 whitespace-nowrap`}
          >
            {levelData?.label} 단어 목록
          </h2>
          <span
            className={`px-2 py-1 ${levelData?.bgClass} ${levelData?.textClass} rounded-xl text-center font-semibold whitespace-nowrap`}
          >
            {levelData?.label}
          </span>
        </div>
        <HskWordFilter />
      </div>
      <HskLevelWordsHeader />
      <ol>
        <DetailHskLevelList words={words} />
      </ol>
      <Pagination page={currentPage} totalPages={totalPages} />
    </div>
  );
}
