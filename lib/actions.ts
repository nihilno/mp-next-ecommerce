import { prisma } from "./prisma";

export async function getProductsAction() {
  const products = await prisma.product.findMany();
  return products;
}
