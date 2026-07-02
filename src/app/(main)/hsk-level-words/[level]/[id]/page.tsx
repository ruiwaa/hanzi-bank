import BackButton from "@/components/ui/BackButton";
import WordDetailCard from "./components/WordDetailCard";
import { fetchHskWordDetail } from "@/app/api/fetchHskWordDetail";

export default async function WordDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
    level: string;
  }>;
}) {
  const { id } = await params;
  const word = await fetchHskWordDetail(id);

  return (
    <div className="container-layout flex flex-col gap-5">
      <div className="flex items-center justify-between md:flex-col md:items-start gap-3">
        <BackButton text="뒤로 가기" />

        <h2 className="text-lg md:text-3xl font-bold">단어 상세</h2>
        <div className="w-16 md:hidden" />
      </div>
      <div className="w-full bg-white shadow-lg rounded-2xl p-5">
        <WordDetailCard word={word} />
      </div>
    </div>
  );
}
