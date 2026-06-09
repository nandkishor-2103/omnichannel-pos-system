import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import type { Order } from "../../types/refund";
import type { Order } from "@/app/store/order/orderTypes";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getOrdersByCashier } from "@/app/store/order/orderThunk";

interface Props {
  onViewOrderDetails: (order: Order | null) => void;
}

export default function OrderTable({ onViewOrderDetails }: Props) {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.order.orders);
  const [search, setSearch] = useState("");
  const userProfile = useAppSelector((state) => state.user.userProfile);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(getOrdersByCashier(userProfile.id));
    }
  }, [dispatch, userProfile?.id]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      return (
        order.id.toString().includes(search) ||
        order.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.phone.includes(search)
      );
    });
  }, [search, orders]);

  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      {/* Header */}
      <div className="border-b px-4 py-1">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Return/Refund</h2>

            <p className="text-sm text-muted-foreground">Select an order for refund</p>
          </div>

          <Input
            placeholder="Search by order id, customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:max-w-sm"
          />
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="h-[640px] overflow-y-auto px-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="transition-colors hover:bg-muted/30">
                <TableCell className="font-semibold">#{order.id}</TableCell>

                <TableCell className="text-muted-foreground">{order.createdAt}</TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{order.customer.fullName}</p>

                    <p className="text-xs text-muted-foreground">
                      {order.customer.phone}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="font-semibold">
                  ₹{order.totalAmount.toFixed(2)}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">{order.paymentType}</Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    className={
                      order.status === "COMPLETED"
                        ? "bg-green-100 text-green-700 hover:bg-green-100 border-green-200"
                        : order.status === "PENDING"
                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200"
                          : order.status === "REFUNDED"
                            ? "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200"
                            : "bg-red-100 text-red-700 hover:bg-red-100 border-red-200"
                    }
                    variant="outline"
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    className="cursor-pointer"
                    onClick={() => onViewOrderDetails(order)}
                  >
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
