"use server";

import { getCart } from "@/lib/actions/cart";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCheckoutSession, OrderWithItemsAndProduct } from "@/lib/stripe";
import { cookies } from "next/headers";

export type ProcessCheckoutResponse = {
  sessionUrl: string;
  order: OrderWithItemsAndProduct;
};

export async function processCheckout(): Promise<ProcessCheckoutResponse> {
  const cart = await getCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

  let orderId: string | null = null;

  //it has to be atomic:
  //total price calculation
  //cart --> order
  //cartItem --> orderItem
  //clearing cart
  //revalidate cache
  //order returned

  try {
    const order = await prisma.$transaction(async (tx) => {
      //total price calculation
      const total = cart.subtotal;

      //cart --> order
      const newOrder = await tx.order.create({
        data: { userId: userId || null, total },
      });

      //cartItem --> orderItem
      const orderItems = cart.items.map((item) => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
      }));

      await tx.orderItem.createMany({
        data: orderItems,
      });

      //clearing cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await tx.cart.delete({
        where: { id: cart.id },
      });

      //order returned
      return newOrder;
    });

    orderId = order.id;

    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: { include: { product: true } },
      },
    });
    if (!fullOrder) throw new Error("Order not found");

    const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);
    if (!sessionId || !sessionUrl)
      throw new Error("Failed to create Stripe session");

    await prisma.order.update({
      where: {
        id: fullOrder.id,
      },
      data: { stripeSessionId: sessionId, status: "pending_payment" },
    });

    (await cookies()).delete("cartId");

    return { sessionUrl, order: fullOrder };
  } catch (error) {
    if (orderId && error instanceof Error && error.message.includes("Stripe"))
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "failed",
        },
      });

    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
}
