import { getCart } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import { CreditCard, FileText, Percent, Truck } from "lucide-react";

async function CartSummary() {
  const cart = await getCart();
  if (!cart) return null;

  const taxes = 0;
  const shipping = 0;
  const total = cart.subtotal + taxes + shipping;

  return (
    <section className="mt-10">
      <h1>Cart Overview</h1>
      <div className="flex flex-col pt-4">
        <div className="text-muted-foreground text-sm">
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Subtotal
            </span>
            <p className="text-foreground text-base">
              {formatPrice(cart.subtotal)}
            </p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Taxes
            </span>
            <p className="italic">Calculated at checkout</p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </span>
            <p className="italic">Calculated at checkout</p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b pb-1 font-semibold">
            <span className="text-muted-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Total
            </span>
            <p className="text-foreground text-base">{formatPrice(total)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartSummary;
