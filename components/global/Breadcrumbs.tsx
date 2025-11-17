import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

type BreadcrumbsProps = {
  items: { label: string; href?: string; active?: boolean }[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="text-xs sm:text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.href && !item.active ? (
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "first-letter:capitalize",
                      item.active && "text-foreground! cursor-default",
                    )}
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <span
                  className={cn(
                    "text-foreground font-normal first-letter:capitalize",
                    item.active && "cursor-default",
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
