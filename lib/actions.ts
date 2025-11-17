"use server";

import { Prisma } from "@/prisma/generated/prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { PAGE_SIZE } from "./constants";
import { prisma } from "./prisma";
import { CartWithProduct, ProductWithCategory, ShoppingCart } from "./types";

export type GetProductsParams = {
  query?: string;
  slug?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

// helpers
export async function findCartFromCookie(): Promise<CartWithProduct | null> {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) return null;

  return unstable_cache(
    async (id: string) => {
      return await prisma.cart.findUnique({
        where: { id },
        include: {
          items: { include: { product: true }, orderBy: { createdAt: "desc" } },
        },
      });
    },
    [`cart-${cartId}`],
    { tags: [`cart-${cartId}`] },
  )(cartId);
}

export async function getProducts({
  query,
  slug,
  sort,
  page = 1,
  pageSize = PAGE_SIZE,
}: GetProductsParams) {
  const where: Prisma.ProductWhereInput = {};

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (slug) {
    where.category = {
      slug: slug,
    };
  }

  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const skip = pageSize ? (page - 1) * pageSize : undefined;
  const take = pageSize;

  return await prisma.product.findMany({
    where,
    orderBy,
    skip,
    take,
  });
}

export async function getProductBySlugAction(
  slug: string,
): Promise<ProductWithCategory> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: { category: true },
    });

    if (!product) notFound();

    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// CART

// na podstawie Cookie Value
export async function getCart(): Promise<ShoppingCart | null> {
  const cart = await findCartFromCookie();
  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.length,
    subtotal: cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    ),
  };
}

export async function getOrCreateCart(): Promise<CartWithProduct> {
  let cart = await findCartFromCookie();
  if (cart) return cart;

  cart = await prisma.cart.create({
    data: {},
    include: { items: { include: { product: true } } },
  });

  (await cookies()).set("cartId", cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return cart;
}

export async function AddToCart(productId: string, quantity: number = 1) {
  if (quantity < 1) throw new Error("Quantity must be at least 1");
  const cart = await getOrCreateCart();

  const existingItem = cart.items.find((item) => item.productId === productId);
  if (existingItem)
    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  else
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

  revalidateTag(`cart-${cart.id}`, { expire: 0 });
}

export async function setProductQuantity(productId: string, quantity: number) {
  if (quantity < 0) throw new Error("Quantity must be at least 0");

  const cart = await findCartFromCookie();

  if (!cart) throw new Error("Cart not found");

  try {
    if (quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId,
        },
      });
    } else
      await prisma.cartItem.updateMany({
        where: {
          cartId: cart.id,
          productId,
        },
        data: { quantity },
      });
    revalidateTag(`cart-${cart.id}`, { expire: 0 });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update cart item quantity");
  }
}
