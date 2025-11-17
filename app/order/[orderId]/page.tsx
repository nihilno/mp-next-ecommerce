import CartEmpty from "@/components/cart/CartEmpty";
import OrderItem from "@/components/order/OrderItem";
import OrderSummary from "@/components/order/OrderSummary";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type OrderPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { orderId } = await params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { product: true } } },
  });

  if (!order) notFound();

  return (
    <>
      {!order || order.items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <ul>
            {order.items.map((item) => (
              <OrderItem key={item.id} orderItem={item} />
            ))}
          </ul>
          <OrderSummary order={order} />

          {/* <form
            action={handleCheckout}
            className="mt-6 flex flex-col items-center"
          >
            <Button size="lg" className="w-full max-w-xl">
              <div className="flex items-center gap-2">
                <ShoppingCart />
                <span>Proceed to Checkout</span>
              </div>
            </Button>
          </form> */}
        </>
      )}
    </>
  );
}
