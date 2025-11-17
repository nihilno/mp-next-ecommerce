import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/actions";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

async function CartIndicator() {
  const cart = await getCart();
  const cartSize = cart?.size || 0;

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/cart">
        <ShoppingCart className="h-4 w-4" />
        {cartSize > 0 && (
          <span className="absolute top-0 right-0 grid h-4 w-4 place-items-center rounded-full bg-red-600 text-xs text-white">
            {cartSize}
          </span>
        )}
      </Link>
    </Button>
  );
}

export default CartIndicator;
