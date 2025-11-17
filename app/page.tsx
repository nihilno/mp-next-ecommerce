import Breadcrumbs from "@/components/global/Breadcrumbs";
import MainPagination from "@/components/global/MainPagination";
import ProductServerWrapper from "@/components/products/ProductServerWrapper";
import { ProductsSkeleton } from "@/components/skeletons/ProductSkeletons";
import { PAGE_SIZE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const total = await prisma.product.count();
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const breadcrumbItems = [{ label: "products", href: "/", active: true }];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <ProductServerWrapper params={{ page }} />
      </Suspense>
      <MainPagination page={page} totalPages={totalPages} />
    </>
  );
}
