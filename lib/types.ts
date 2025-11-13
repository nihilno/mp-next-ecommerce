import { Prisma } from "@/prisma/generated/prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;
