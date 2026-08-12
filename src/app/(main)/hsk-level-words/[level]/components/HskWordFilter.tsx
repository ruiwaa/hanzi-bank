"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function HskWordFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const router = useRouter();
  const pathName = usePathname();
  const sort = searchParams.get("sort") ?? "frequency";

  const handleSortChange = (value: string) => {
    params.set("sort", value);
    params.set("page", "1");

    router.push(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="flex gap-2">
      <Select value={sort} onValueChange={handleSortChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          className="min-w-0 -translate-x-0.5 text-center"
          align="center"
          position="popper"
        >
          <SelectItem value="frequency">빈도 높은 순</SelectItem>
          <SelectItem value="latest">최신순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
