"use client";

import { Button } from "@/components/ui/button";
import { setProductQuantity } from "@/lib/actions/cart";
import { CartItemWithProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type CartItemProps = {
  cartItem: CartItemWithProduct;
};

function CartItem({ cartItem }: CartItemProps) {
  const {
    product: { id, name, image, price, description },
    quantity,
  } = cartItem;
  const [isLoading, setIsLoading] = useState(false);

  async function handleSetProductQuantity(quantity: number) {
    try {
      setIsLoading(true);
      await setProductQuantity(id, quantity);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <li className="border-muted flex justify-between border-b py-4 select-none">
      <div className="flex space-x-4">
        <div className="absolute z-10 -mt-3 -ml-3">
          <Button
            variant="ghost"
            size="icon-sm"
            disabled={isLoading}
            className="bg-muted text-muted-foreground hover:bg-muted! h-8 w-8 rounded-full hover:scale-110 sm:h-10 sm:w-10"
            onClick={() => handleSetProductQuantity(0)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="border-muted h-16 w-16 shrink-0 overflow-hidden rounded-md border sm:h-24 sm:w-24">
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
      <div className="flex flex-col items-end justify-between">
        <p className="font-medium">{formatPrice(price)}</p>

        <div className="border-muted flex items-center rounded-full border">
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-l-full"
            onClick={() => handleSetProductQuantity(quantity - 1)}
            disabled={isLoading}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <p className="w-6 cursor-default text-center text-sm">{quantity}</p>
          <Button
            variant="ghost"
            size="icon-sm"
            className="rounded-r-full"
            onClick={() => handleSetProductQuantity(quantity + 1)}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
