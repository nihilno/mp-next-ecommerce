"use server";

import { notFound } from "next/navigation";
import { prisma } from "./prisma";
import { ProductWithCategory } from "./types";

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
