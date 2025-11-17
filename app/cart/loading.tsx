import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="mb-8 flex flex-col">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-md sm:h-24 sm:w-24" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-12 sm:w-24" />
                <Skeleton className="h-4 w-24 sm:w-64" />
              </div>
            </div>
            <div className="flex flex-col items-end justify-between gap-2 sm:gap-10">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-[90px] rounded-full" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="mt-10 space-y-4">
          <Skeleton className="h-6 w-32" />

          <div className="flex justify-between pt-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-5 w-18" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex justify-between font-semibold">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="mx-auto mt-12 h-10 w-full max-w-xl" />
        </div>
      </div>
    </>
  );
}
