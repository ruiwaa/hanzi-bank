import { fetchSearchWords } from "@/app/api/fetchSearchWord";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import Pagination from "@/components/ui/Pagination";
import BackButton from "@/components/ui/BackButton";

interface Props {
  keyword: string;
  page: number;
  limit: number;
  sortParams: string;
}
export async function SearchContent({
  keyword,
  page,
  limit,
  sortParams,
}: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const words = await fetchSearchWords(
    keyword,
    page,
    limit,
    sortParams === "frequency" ? "frequency" : "relevance",
  );
  const totalPages = Math.ceil(words.totalCount / limit);

  return (
    <>
      {words.totalCount === 0 ? (
        <div className="desktop-layout flex flex-col gap-3">
          <BackButton href={"/"} text="메인으로" />
          <p className="text-red-500 whitespace-pre-wrap self-center font-bold text-lg mt-5">
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
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
