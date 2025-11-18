import ProductCard from "@/components/products/ProductCard";
import { GetProductsParams } from "@/lib/actions/cart";
import { Product } from "@/prisma/generated/prisma/client";
import ProductEmpty from "./ProductEmpty";

type ProductListProps = {
  products: Product[];
  params: GetProductsParams;
};

async function ProductList({ products, params }: ProductListProps) {
  const { query } = params;

  if (products.length === 0) {
    return <ProductEmpty query={query} />;
  }

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

export default ProductList;
