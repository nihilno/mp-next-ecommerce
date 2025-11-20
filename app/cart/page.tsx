import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/actions/cart";

import { processCheckout, ProcessCheckoutResponse } from "@/lib/actions/orders";
import { ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
  },
};

export const openGraph = null;
export const twitter = null;

export default async function CartPage() {
  const cart = await getCart();

  async function handleCheckout() {
    "use server";
    let result: ProcessCheckoutResponse | null = null;

    try {
      result = await processCheckout();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    if (result) redirect(result.sessionUrl);
  }

  return (
    <>
      {!cart || cart.items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <ul>
            {cart.items.map((item) => (
              <CartItem key={item.id} cartItem={item} />
            ))}
          </ul>
          <CartSummary />

          <form
            action={handleCheckout}
            className="mt-6 flex flex-col items-center"
          >
            <Button size="lg" className="w-full max-w-xl">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                <span>Proceed to Checkout</span>
              </div>
            </Button>
          </form>
        </>
      )}
    </>
  );
}
