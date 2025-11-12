import ProductCard from "@/components/products/ProductCard";
import { getProductsAction } from "@/lib/actions";

export default async function HomePage() {
  const products = await getProductsAction();

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Home</h1>
      <p>Showing {products.length} products</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </main>
  );
}
