"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

const PAGE_SIZE = 5;

export default function Pagination({ page, totalPages }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathName}?${params.toString()}`);
  };
  const currentGroup = Math.floor((page - 1) / PAGE_SIZE);
  const startPage = currentGroup * PAGE_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_SIZE - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className="flex flex-row justify-center  items-center md:justify-evenly gap-2 mb-3">
      <button
        onClick={() => handlePageChange(1)}
        aria-disabled={page === 1}
        className={`cursor-pointer aria-disabled:cursor-not-allowed`}
        aria-label="맨처음 페이지로 가기"
      >
        <ChevronsLeft aria-hidden="true" />
      </button>
      <button
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        aria-disabled={page === 1}
        className={`cursor-pointer aria-disabled:cursor-not-allowed`}
        aria-label="이전 페이지로 가기"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`cursor-pointer px-2 py-1 ${pageNumber === page ? "font-bold text-red-500" : ""}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
        aria-disabled={page === totalPages}
        className={`cursor-pointer aria-disabled:cursor-not-allowed`}
        aria-label="다음 페이지로 가기"
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        aria-disabled={page === totalPages}
        className={`cursor-pointer aria-disabled:cursor-not-allowed`}
        aria-label="맨 마지막 페이지로 가기"
      >
        <ChevronsRight aria-hidden="true" />
      </button>
    </div>
  );
}
