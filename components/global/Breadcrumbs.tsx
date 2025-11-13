import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import React from "react";

type BreadcrumbsProps = {
  items: { label: string; href?: string; active?: boolean }[];
};

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList className="text-xs sm:text-sm">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink
                href={item.href}
                className={cn(
                  "capitalize",
                  item.active && "text-foreground! cursor-default",
                )}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
