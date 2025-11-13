import Breadcrumbs from "@/components/global/Breadcrumbs";
import MainPagination from "@/components/global/MainPagination";
import Products from "@/components/products/Products";
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

  return (
    <>
      <Breadcrumbs items={[{ label: "products", href: "/", active: true }]} />
      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <Products page={page} />
      </Suspense>
      <MainPagination page={page} totalPages={totalPages} />
    </>
  );
}
