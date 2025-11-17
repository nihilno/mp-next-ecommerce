import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative aspect-video">
        <Skeleton className="h-full w-full" />
      </div>

      <CardHeader className="mb-10">
        <Skeleton className="mb-2 h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardFooter className="mt-auto text-lg">
        <Skeleton className="h-6 w-25" />
      </CardFooter>
    </Card>
  );
}

export function ProductsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <Card className="mx-auto mt-12 max-w-4xl cursor-default py-0 md:py-0">
        <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
          <div className="relative aspect-video h-full overflow-hidden rounded-t-lg md:aspect-3/4 md:rounded-l-lg md:rounded-tr-none">
            <Skeleton className="h-full w-full" />
          </div>

          <div className="flex h-full flex-col justify-between gap-8 p-6 sm:px-6 sm:pt-8 sm:pb-12">
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

            <Skeleton className="mt-auto h-8 w-36 pt-4" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function BreadcrumbsSkeleton() {
  return (
    <div className="flex h-5 items-center gap-4">
      <Skeleton className="h-5 w-5 rounded-full" />
      <Skeleton className="h-full w-16 md:w-24" />
      <Skeleton className="h-full w-16 md:w-24" />
    </div>
  );
}

export function CartIndicatorSkeleton() {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative opacity-50"
      disabled
    >
      <Link href="/cart">
        <Loader2Icon className="h-4 w-4 animate-spin" />
      </Link>
    </Button>
  );
}
