import {
  BreadcrumbsSkeleton,
  ProductsSkeleton,
} from "@/components/skeletons/ProductSkeletons";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <ProductsSkeleton />;
    </>
  );
}
