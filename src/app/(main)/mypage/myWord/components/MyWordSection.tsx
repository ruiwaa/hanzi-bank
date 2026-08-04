"use client";

import { useMyWords } from "@/hooks/useMywords";
import { useSession } from "@/hooks/useSession";
import MyWordCard from "./MyWordCard";
import { Loader2Icon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

export default function MyWordSection() {
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

  const { data, isLoading, isError } = useMyWords({
    userId: user?.id ?? "",
    page,
    pageSize,
    level,
    sort,
  });

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col mx-auto justify-center items-center gap-2 mt-3">
        <Loader2Icon className="animate-spin" />
        <p> 불러오는 중...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <p className="text-center text-red-500 font-bold">
        단어를 불러오지 못했습니다.{" "}
      </p>
    );
  }

  if (!data) return null;

  return (
    <>
      <div className="flex flex-row gap-2">
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
          저장된 단어가 없습니다.
        </p>
      ) : (
        <div>
          <ul className="mt-4 space-y-4 bg-white p-4 rounded-2xl border border-gray-200">
            {data?.items.map((item) => (
              <MyWordCard key={item.hsk_words.id} word={item} />
            ))}
          </ul>
          <Pagination page={page} totalPages={totalPages} />
        </div>
      )}
    </>
  );
}
