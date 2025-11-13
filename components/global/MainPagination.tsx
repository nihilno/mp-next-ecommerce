"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getVisiblePages } from "@/lib/utils";
import { useEffect } from "react";

type MainPaginationProps = {
  page: number;
  totalPages: number;
};

function MainPagination({ page, totalPages }: MainPaginationProps) {
  const prev = page === 1 ? totalPages : page - 1;
  const next = page === totalPages ? 1 : page + 1;

  const pages = getVisiblePages(page, totalPages);
  const shouldShowAll = totalPages <= 7;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${prev}`} />
        </PaginationItem>

        {shouldShowAll
          ? Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`?page=${pageNum}`}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })
          : pages.map((p, index) =>
              typeof p === "string" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink href={`?page=${p}`} isActive={page === p}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

        <PaginationItem>
          <PaginationNext href={`?page=${next}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default MainPagination;
