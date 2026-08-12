"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();
  const pathName = usePathname();

  const sort = searchParams.get("sort") ?? "relevance";

  const handleSortChange = (value: string) => {
    params.set("sort", value);
    params.set("page", "1");

    router.push(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex gap-2 self-end">
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="min-w-0 -translate-x-0.5 text-center"
          align="center"
          position="item-aligned"
        >
          <SelectItem value="relevance">관련도 높은 순</SelectItem>
          <SelectItem value="frequency">빈도 높은 순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
