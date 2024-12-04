"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Pagination = ({ maxPages }: { maxPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const nextPage = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page + 1));
    replace(pathname + "?" + params.toString());
  };

  const prevPage = () => {
    const params = new URLSearchParams(searchParams);
    if (page - 1 <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(page - 1));
    }
    replace(pathname + "?" + params.toString());
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (page > maxPages) {
      params.set("page", String(maxPages));
      replace(pathname + "?" + params.toString());
    }
    if (page <= 1) {
      params.delete("page");
      replace(pathname + "?" + params.toString());
    }
  }, [page, maxPages, pathname, replace, searchParams]);

  if (maxPages <= 1) return;

  return (
    <nav className="flex justify-center items-center gap-4">
      <button
        disabled={page <= 1}
        onClick={prevPage}
        className={`p-4 rounded-md transition shadow-xl ${
          page <= 1
            ? "text-slate-400"
            : "bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
        }`}
      >
        <HiChevronLeft />
      </button>
      <span className="text-lg font-bold">{page}</span>
      <button
        disabled={page >= maxPages}
        onClick={nextPage}
        className={`p-4 rounded-md transition shadow-xl ${
          page >= maxPages
            ? "text-slate-400"
            : "bg-slate-200 hover:bg-slate-300 active:bg-slate-400"
        }`}
      >
        <HiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
