"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

function CategorySidebar({
  categories,
}: {
  categories: { name: string; slug: string }[];
}) {
  const params = useParams();
  const activeCategory = params.slug as string;

  return (
    <div className="w-32 flex-none">
      <h3 className="text-muted-foreground mb-2 text-sm">Collections</h3>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/search/${category.slug}`}
              className={cn(
                activeCategory === category.slug ? "underline" : "",
                "hover:text-primary text-sm",
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategorySidebar;
