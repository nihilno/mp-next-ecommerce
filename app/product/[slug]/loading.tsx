import { BreadcrumbsSkeleton } from "@/components/skeletons/BreadcrumbSkeletons";
import { SingleProductPageSkeleton } from "@/components/skeletons/ProductSkeletons";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <SingleProductPageSkeleton />
    </>
  );
}
