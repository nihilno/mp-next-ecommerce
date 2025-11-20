import { Skeleton } from "@/components/ui/skeleton";

export function BreadcrumbsSkeleton() {
  return (
    <div className="flex h-5 items-center gap-4">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-full w-16 md:w-24" />
      <Skeleton className="h-full w-16 md:w-24" />
    </div>
  );
}
