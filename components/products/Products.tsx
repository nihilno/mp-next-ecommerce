import ProductCard from "@/components/products/ProductCard";
import { PAGE_SIZE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

async function Products({ page }: { page: number }) {
  const skip = (page - 1) * PAGE_SIZE;
  const products = await prisma.product.findMany({
    skip,
    take: PAGE_SIZE,
    orderBy: { name: "desc" },
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}

export default Products;
