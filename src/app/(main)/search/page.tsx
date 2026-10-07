import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Suspense } from "react";
import { SearchContent } from "./components/SearchConternt";

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

  return (
    <div className="max-w-full min-h-screen desktop-layout flex flex-col gap-3">
      <h1 className="sr-only">검색 결과 페이지</h1>
      <Suspense fallback={<LoadingSpinner ariaLabel={"검색 결과"} />}>
        <SearchContent
          keyword={keyword}
          page={currentPage}
          limit={currentLimit}
          sortParams={sortParams}
        />
      </Suspense>
    </div>
  );
}
