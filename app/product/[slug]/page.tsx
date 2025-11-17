import Breadcrumbs from "@/components/global/Breadcrumbs";
import SingleProductPageCard from "@/components/products/SingleProductPageCard";
import { getProductBySlugAction } from "@/lib/actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugAction(slug);

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

export default async function SingleProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugAction(slug);

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
    </>
  );
}
