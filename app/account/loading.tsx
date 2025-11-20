import { BreadcrumbsSkeleton } from "@/components/skeletons/BreadcrumbSkeletons";
import { OrdersTableSkeleton } from "@/components/skeletons/OrderSkeletons";

export default function Loading() {
  return (
    <>
      <BreadcrumbsSkeleton />
      <OrdersTableSkeleton />
    </>
  );
}
