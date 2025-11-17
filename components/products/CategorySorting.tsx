"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function CategorySorting() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort");

  function createSortUrl(sortValue: string | null): string {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) params.set("sort", sortValue);
    else params.delete("sort");

    const queryString = params.toString();
    return `${pathname}${queryString ? `?${queryString}` : ""}`;
  }

  return (
    <div className="w-32 flex-none">
      <h3 className="text-muted-foreground mb-2 text-sm">Sort by</h3>

      <ul className="space-y-1">
        <li>
          <Link
            href={createSortUrl(null)}
            className={cn(
              "hover:text-primary text-sm",
              !currentSort ? "underline" : "",
            )}
          >
            Latest
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl("price-asc")}
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-asc" ? "underline" : "",
            )}
          >
            Price: Low to High
          </Link>
        </li>
        <li>
          <Link
            href={createSortUrl("price-desc")}
            className={cn(
              "hover:text-primary text-sm",
              currentSort === "price-desc" ? "underline" : "",
            )}
          >
            Price: High to Low
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CategorySorting;
