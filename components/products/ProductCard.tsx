import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/prisma/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
  loading?: "eager" | "lazy";
};

function ProductCard({ product, loading = "lazy" }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card className="overflow-hidden pt-0">
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

        <CardHeader>
          <CardTitle className="line-clamp-1 text-xl">{product.name}</CardTitle>
          <CardDescription className="line-clam-3 min-h-20">
            {product.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto text-lg">
          {formatPrice(product.price)}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default ProductCard;
