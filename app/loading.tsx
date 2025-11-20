import { BreadcrumbsSkeleton } from "@/components/skeletons/BreadcrumbSkeletons";
import { ProductsSkeleton } from "@/components/skeletons/ProductSkeletons";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />
    </>
  );
}
