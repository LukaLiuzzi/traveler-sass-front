"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const onPageChange = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="flex h-8 items-center justify-center -space-x-px text-sm">
        <Link href={onPageChange(currentPage - 1)}>
          <button
            disabled={currentPage === 1}
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border px-3 leading-tight"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </Link>
        {pages.map((page) => (
          <Link key={page} href={onPageChange(page)}>
            <button
              aria-current={currentPage === page ? "page" : undefined}
              className={`flex h-8 items-center justify-center px-3 leading-tight ${
                currentPage === page
                  ? "z-10 border border-strokedark bg-strokedark text-white dark:border-white dark:bg-meta-9 dark:text-strokedark"
                  : "border"
              }`}
            >
              {page}
            </button>
          </Link>
        ))}
        <Link href={onPageChange(currentPage + 1)}>
          <button
            disabled={currentPage === totalPages}
            className="border-e-lg ms-0 flex h-8 items-center justify-center rounded-e-lg border px-3 leading-tight"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </Link>
      </ul>
    </nav>
  );
};

export default Pagination;
