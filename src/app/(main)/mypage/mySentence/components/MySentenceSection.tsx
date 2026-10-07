"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Pagination from "@/components/ui/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMySentences } from "@/hooks/useMysentences";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MySentenceCard from "./mySentenceCard";

export default function MySentenceSection() {
  const { user } = useSession();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathName = usePathname();
  const page = Number(searchParams.get("page") ?? 1);
  const levelParam = searchParams.get("level");
  const level =
    levelParam === null || levelParam === "all"
      ? "all"
      : (Number(levelParam) as 1 | 2 | 3 | 4 | 5 | 6);
  const sort = (searchParams.get("sort") as "latest" | "oldest") ?? "latest";
  const pageSize = 20;

  const { data, isLoading, isError } = useMySentences({
    userId: user?.id ?? "",
    page,
    pageSize,
    level,
    sort,
  });

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  if (isLoading) {
    return (
      <>
        <LoadingSpinner ariaLabel="나의 예문" />
      </>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 font-bold">
        예문을 불러오지 못했습니다.
      </p>
    );
  }

  if (!user) return null;
  if (!data) return null;

  // 데이터 그룹 맵핑
  type Group = {
    word: (typeof data.items)[number]["hsk_words"];
    sentences: typeof data.items;
  };

  const grouped: Record<string, Group> = {};

  for (const item of data.items) {
    const wordId = item.hsk_words.id;

    if (!grouped[wordId]) {
      grouped[wordId] = {
        word: item.hsk_words,
        sentences: [],
      };
    }

    grouped[wordId].sentences.push(item);
  }

  const groupedItems = Object.values(grouped);

  return (
    <div>
      <div className="flex flex-row gap-2 pb-3">
        <Select
          value={String(level)}
          onValueChange={(value) => {
            params.set("level", value);
            params.set("page", "1");
            router.push(`${pathName}?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-30">
            <SelectValue placeholder="급수 선택" />
          </SelectTrigger>
          <SelectContent className="text-center">
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="1">HSK 1급</SelectItem>
            <SelectItem value="2">HSK 2급</SelectItem>
            <SelectItem value="3">HSK 3급</SelectItem>
            <SelectItem value="4">HSK 4급</SelectItem>
            <SelectItem value="5">HSK 5급</SelectItem>
            <SelectItem value="6">HSK 6급</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sort}
          onValueChange={(value) => {
            params.set("sort", value);
            params.set("page", "1");
            router.push(`${pathName}?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="oldest">오래된순</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {data.items.length === 0 ? (
        <p className="text-red-500 font-bold text-center mt-3">
          저장된 예문이 없습니다.
        </p>
      ) : (
        <>
          <ul className="w-full bg-card p-5 border border-gray-100 rounded-lg">
            {groupedItems.map((item) => (
              <MySentenceCard
                key={item.word.id}
                userId={user.id}
                word={item.word}
                sentences={item.sentences}
              />
            ))}
          </ul>
          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
