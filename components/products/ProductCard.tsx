import { Product } from "@/app/generated/prisma/client";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  loading?: "eager" | "lazy";
};

function ProductCard({ product, loading = "lazy" }: ProductCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading={loading}
        />
      </div>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">{formatPrice(product.price)}</p>
      <p className="text-gray-500">{product.description}</p>
    </div>
  );
}

export default ProductCard;
