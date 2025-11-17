import { Prisma } from "@/prisma/generated/prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type CartWithProduct = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;
