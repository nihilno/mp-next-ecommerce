import {
  BreadcrumbsSkeleton,
  SingleProductPageSkeleton,
} from "@/components/skeletons/ProductSkeletons";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <SingleProductPageSkeleton />
    </>
  );
}
