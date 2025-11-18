import OrdersTable from "@/components/account/OrdersTable";
import Breadcrumbs from "@/components/global/Breadcrumbs";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: { createdAt: "desc" },
  });

  const breadcrumbItems = [
    { label: "my account", href: "/account", active: true },
  ];

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <OrdersTable orders={orders} />
    </div>
  );
}
