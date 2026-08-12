import { fetchSearchWords } from "@/app/api/fetchSearchWord";
import SearchResult from "./components/SearchResult";
import BackButton from "@/components/ui/BackButton";
import Pagination from "@/components/ui/Pagination";
import SearchFilter from "./components/SearchFilter";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword: string;
    page: number;
    limit: number;
    sort: string;
  }>;
}) {
  const {
    keyword = "",
    page = 1,
    limit = 10,
    sort: sortParams = "relevance",
  } = await searchParams;
  const currentPage = Number(page);
  const currentLimit = Number(limit);

  const words = await fetchSearchWords(
    keyword,
    currentPage,
    currentLimit,
    sortParams === "frequency" ? "frequency" : "relevance",
  );
  const totalPages = Math.ceil(words.totalCount / currentLimit);

  return (
    <div className="max-w-full min-h-screen desktop-layout flex flex-col gap-3">
      <h1 className="sr-only">검색 결과 페이지</h1>
      {words.totalCount === 0 ? (
        <div className="desktop-layout flex flex-col gap-3">
          <BackButton href={"/"} text="메인으로" />
          <p className="text-red-500 whitespace-pre-wrap self-center font-bold text-lg">
            검색 결과가 없습니다.
          </p>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground font-medium px-1">
            검색결과 {words.totalCount} 개
          </p>
          <SearchFilter />
          <SearchResult words={words.words} />
          <Pagination page={currentPage} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
