import SearchForm from "@/app/(main)/search/components/SearchForm";

export default function Search() {
  return (
    <div className="max-w-full min-h-screen desktop-layout">
      <h1 className="sr-only">검색 페이지</h1>
      <SearchForm />
    </div>
  );
}
