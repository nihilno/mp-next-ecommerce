import CartEmpty from "@/components/cart/CartEmpty";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import OrderItem from "@/components/order/OrderItem";
import OrderSummary from "@/components/order/OrderSummary";
import { auth } from "@/lib/auth";
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

  const session = await auth();
  const isOwner = session?.user?.id === order.userId;
  const breadcrumbsItems = [
    {
      label: "My Account",
      href: "/account",
    },
    {
      label: "Order",
      href: `/order/${orderId}`,
      active: true,
    },
  ];

  return (
    <>
      {!order || order.items.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          {isOwner && <Breadcrumbs items={breadcrumbsItems} />}
          <div className="mt-2 mb-6 flex items-center justify-between border-b pb-4">
            <h1 className="text-lg sm:text-xl">
              Order #: <span className="uppercase">{order.id}</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              {order.createdAt.toLocaleString()}
            </p>
          </div>

          <ul>
            {order.items.map((item) => (
              <OrderItem key={item.id} orderItem={item} />
            ))}
          </ul>
          <OrderSummary order={order} />
        </>
      )}
    </>
  );
}
