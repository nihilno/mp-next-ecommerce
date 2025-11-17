import AddToCartButton from "@/components/global/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductWithCategory } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

async function SingleProductPageCard({
  product,
}: {
  product: ProductWithCategory;
}) {
  const { image, name, price, category, description, inventory } = product;

  return (
    <Card className="mx-auto mt-12 max-w-4xl cursor-default py-0 md:py-0">
      <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
        <div className="relative aspect-video h-full overflow-hidden rounded-t-lg md:aspect-3/4 md:rounded-l-lg md:rounded-tr-none">
          <Image
            src={image}
            alt={name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex h-full flex-col justify-between p-6 sm:px-6 sm:pt-8 sm:pb-12">
          <CardHeader className="p-0">
            <CardTitle className="text-xl font-bold md:text-2xl">
              {name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="text-foreground text-lg font-semibold">
                {formatPrice(price)}
              </span>
              <Badge variant="outline">{category?.name}</Badge>
            </CardDescription>
          </CardHeader>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h2 className="font-medium">Description</h2>
            <span className="text-muted-foreground text-sm">{description}</span>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <h2 className="font-medium">Availibility</h2>
            <div className="flex items-center gap-2">
              {inventory > 0 ? (
                <Badge variant="outline" className="text-green-500">
                  In stock ({inventory})
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="cursor-not-allowed! text-red-500"
                >
                  Out of inventory
                </Badge>
              )}

              {inventory > 0 && (
                <span className="text-muted-foreground text-xs">
                  ({inventory} items available)
                </span>
              )}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mt-auto pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingleProductPageCard;
