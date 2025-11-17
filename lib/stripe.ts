import { Prisma } from "@/prisma/generated/prisma/client";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY)
  throw new Error("Missing STRIPE_SECRET_KEY env variable");

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-10-29.clover",
  typescript: true,
});

export type OrderWithItemsAndProduct = Prisma.OrderGetPayload<{
  include: {
    items: { include: { product: true } };
  };
}>;

export async function createCheckoutSession(order: OrderWithItemsAndProduct) {
  if (!order.items || order.items.length === 0)
    throw new Error("Order has no items");

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
    order.items.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.name,
            description: item.product.description || "",
            images: [item.product.image || ""],
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      };
    });

  const success_url = `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_PUBLIC_URL}/checkout/cancel?session_id={CHECKOUT_SESSION_ID}`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url,
      cancel_url,
      metadata: { orderId: order.id.toString() },
    });

    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create checkout session");
  }
}
