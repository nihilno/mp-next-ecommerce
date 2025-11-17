import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Prisma } from "@/prisma/generated/prisma/client";
import { Asterisk } from "lucide-react";
import Image from "next/image";

type OrderItemProps = {
  orderItem: Prisma.OrderItemGetPayload<{ include: { product: true } }>;
};

function OrderItem({ orderItem }: OrderItemProps) {
  const {
    product: { image, name, description },
    price,
    quantity,
  } = orderItem;

  return (
    <li className="border-muted flex justify-between border-b py-4 select-none">
      <div className="flex space-x-4">
        <div className="absolute z-10 -mt-3 -ml-3"></div>
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border sm:h-24 sm:w-24">
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <h2 className="line-clamp-1 text-sm font-medium sm:text-base">
            {name}
          </h2>
          <p className="text-muted-foreground line-clamp-1 hidden text-sm sm:block">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-4 text-sm sm:gap-8 sm:text-base">
        <div className="flex items-center gap-1 sm:gap-2">
          <p>{formatPrice(price)}</p>
          <Asterisk className="h-3 w-3 sm:h-4 sm:w-4" />
          <Badge className="h-5">Qty: {quantity}</Badge>
        </div>
        <p className="font-bold">{formatPrice(price * quantity)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
