import Breadcrumbs from "@/components/global/Breadcrumbs";
import ProductServerWrapper from "@/components/products/ProductServerWrapper";
import { ProductsSkeleton } from "@/components/skeletons/ProductSkeletons";
import { Metadata } from "next";
import { Suspense } from "react";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const searchParamsResolved = await searchParams;
  const query = searchParamsResolved.query?.trim() || "";

  const title = query ? `Results for "${query}"` : "Search Products";

  const description = query
    ? `Find products matching "${query}". Explore our wide selection of items at Next Store.`
    : "Search for products in our store. Discover great deals and new arrivals.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchParamsResolved = await searchParams;
  const query = searchParamsResolved.query?.trim() || "";
  const sort = searchParamsResolved.sort;

  const breadcrumbsItems = [
    { label: "Products", href: "/" },
    {
      label: `Results for "${query}"`,
      href: `/search/${encodeURIComponent(query)}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
        <ProductServerWrapper params={{ query, sort }} />
      </Suspense>
    </>
  );
}
