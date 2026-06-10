import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getRecentOrdersByBranch } from "@/app/store/order/orderThunk";
import { Badge } from "@/components/ui/badge.tsx";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useEffect } from "react";

type OrderStatus = "COMPLETED" | "PENDING" | "REFUNDED" | "CANCELLED";

type RecentOrder = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "COMPLETED":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";

    case "PENDING":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";

    case "CANCELLED":
      return "bg-red-500/10 text-red-600 border-red-500/20";

    case "REFUNDED":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20";

    default:
      return "";
  }
};

export default function RecentOrders() {
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);
  const recentOrders = useAppSelector((state) => state.order.recentOrders);

  useEffect(() => {
    if (branch?._id) {
      dispatch(getRecentOrdersByBranch(branch._id));
    }
  }, [dispatch, branch?._id]);
  return (
    <Card className="rounded-2xl border border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Recent Orders
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest customer transactions
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <p className="text-xs text-muted-foreground">Today's Orders</p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-xl border border-border/50">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead className="font-semibold">Order ID</TableHead>

                <TableHead className="font-semibold">Customer</TableHead>

                <TableHead className="font-semibold">Amount</TableHead>

                <TableHead className="font-semibold">Status</TableHead>

                <TableHead className="text-right font-semibold">Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentOrders.slice(0, 5).map((order) => (
                <TableRow key={order.id} className="transition-colors hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">
                    #{order.id.slice(-6).toUpperCase()}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {order.customer.fullName?.split(" ").slice(0, 2).join(" ")}
                  </TableCell>

                  <TableCell className="font-medium text-foreground">
                    ₹{order.totalAmount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status as OrderStatus)}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground">
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
