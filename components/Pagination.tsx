"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

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

  if (maxPages === 1) return;

  return (
    <nav>
      <button disabled={page <= 1} onClick={prevPage}>
        {"<"}
      </button>
      <span>{page}</span>
      <button disabled={page >= maxPages - 1} onClick={nextPage}>
        {">"}
      </button>
    </nav>
  );
};

export default Pagination;
