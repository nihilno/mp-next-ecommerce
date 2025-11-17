import Breadcrumbs from "@/components/global/Breadcrumbs";
import ProductServerWrapper from "@/components/products/ProductServerWrapper";
import { ProductsSkeleton } from "@/components/skeletons/ProductSkeletons";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true },
  });

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const title = `${category.name}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, slug: true },
  });

  if (!category) notFound();

  const breadcrumbsItems = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/${encodeURIComponent(category.name)}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
        <ProductServerWrapper params={{ slug, sort }} />
      </Suspense>
    </>
  );
}
