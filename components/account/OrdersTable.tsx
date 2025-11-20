import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/prisma/generated/prisma/client";
import Link from "next/link";
import OrderStatusBadge from "../order/OrderStatusBadge";

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      {orders.length > 0 && (
        <TableCaption>A list of your recent orders.</TableCaption>
      )}

      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">Order #</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No orders found.
            </TableCell>
          </TableRow>
        )}

        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>
              <OrderStatusBadge status={order.status} />
            </TableCell>
            <TableCell>{formatPrice(order.total)}</TableCell>
            <TableCell>{order.createdAt.toLocaleString()}</TableCell>
            <TableCell>
              <Link className="underline" href={`/order/${order.id}`}>
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default OrdersTable;
