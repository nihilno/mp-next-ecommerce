import { OrderWithItemsAndProduct } from "@/lib/stripe";
import { formatPrice } from "@/lib/utils";
import {
  CreditCard,
  FileText,
  LoaderCircle,
  Percent,
  Truck,
} from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";

type OrderSummaryProps = {
  order: OrderWithItemsAndProduct;
};

function OrderSummary({ order }: OrderSummaryProps) {
  const { total, status } = order;

  return (
    <section className="mt-10">
      <h1>Order Overview</h1>
      <div className="flex flex-col pt-4">
        <div className="text-muted-foreground text-sm">
          <StatusBadge status={status} />
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Subtotal
            </span>
            <p className="text-foreground text-base">{formatPrice(total)}</p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Percent className="h-4 w-4" />
              Taxes
            </span>
            <p className="italic">{formatPrice(0)}</p>
          </div>
          <div className="mb-3 flex items-center justify-between border-b pb-1">
            <span className="text-muted-foreground flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Shipping
            </span>
            <p className="italic">{formatPrice(0)}</p>
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

function StatusBadge({ status }: { status: string }) {
  return (
    <div className="mb-3 flex items-center justify-between border-b pb-1">
      <span className="text-muted-foreground flex items-center gap-2">
        <LoaderCircle className="h-4 w-4" />
        Status
      </span>
      <OrderStatusBadge status={status} />
    </div>
  );
}

export default OrderSummary;
