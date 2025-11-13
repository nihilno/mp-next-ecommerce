import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader>
        <Skeleton className="mb-2 h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardFooter className="mt-auto text-lg">
        <Skeleton className="h-6 w-1/4" />
      </CardFooter>
    </Card>
  );
}

export function ProductsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      <div className="mt-11 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </>
  );
}

export function SingleProductPageSkeleton() {
  return (
    <>
      <Card className="mx-auto mt-17 max-w-4xl cursor-default py-0 md:py-0">
        <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
          <div className="relative aspect-video h-full overflow-hidden rounded-t-lg md:aspect-3/4 md:rounded-l-lg md:rounded-tr-none">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="space-y-6 p-6 sm:px-6 sm:pt-8 sm:pb-12">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>

            <Separator />

            <Skeleton className="h-8 w-36" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
