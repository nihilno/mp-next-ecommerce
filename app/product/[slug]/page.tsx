import Breadcrumbs from "@/components/global/Breadcrumbs";
import SingleProductPageCard from "@/components/products/SingleProductPageCard";
import { getProductBySlugActionCached } from "@/lib/actions/cart";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProductBySlugActionCached(slug);

  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({ slug: product.slug }));
}

export default async function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const product = await getProductBySlugActionCached(slug);

  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    offers: {
      "@type": "Offer",
      price: product.price.toString(),
      priceCurrency: "USD",
      availability: product.inventory > 0 ? "InStock" : "OutOfStock",
    },
  };

  const breadcrumbsItems = [
    { label: "products", href: "/" },
    {
      label: product?.category.name || "category",
      href: `/search/${(product?.category.name).toLowerCase()}`,
    },
    { label: product?.name || "product", active: true },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <SingleProductPageCard product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
