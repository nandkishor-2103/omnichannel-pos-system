import { useMemo, useState } from "react";

import { useAppSelector } from "@/app/store/hooks";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EyeIcon, PrinterIcon, Search } from "lucide-react";

import type { Order as StoreOrder } from "@/app/store/order/orderTypes";

interface OrderTableProps {
  onViewOrderDetails: (order: StoreOrder) => void;
}

export default function OrderTable({ onViewOrderDetails }: OrderTableProps) {
  const orders = useAppSelector((state) => state.order.orders);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return orders;

    return orders.filter(
      (order) =>
        order.id.toLowerCase().includes(query) ||
        order.customer.fullName.toLowerCase().includes(query)
    );
  }, [orders, searchTerm]);

  return (
    <div className="h-full rounded-xl border bg-background shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Order History</h2>

          <p className="text-sm text-muted-foreground">
            View and manage recent customer orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search order or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {filteredOrders.length} Orders
          </Badge>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="h-[calc(100vh-160px)] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-20 bg-background shadow-sm">
            <TableRow>
              <TableHead className="w-[220px] pl-6">Order ID</TableHead>

              <TableHead className="w-[120px]">Customer</TableHead>

              <TableHead className="w-[110px]">Date & Time</TableHead>

              <TableHead className="w-[100px] text-right">Amount</TableHead>

              <TableHead className="w-[100px]">Payment</TableHead>

              <TableHead className="w-[130px]">Status</TableHead>

              <TableHead className="w-[100px] pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="h-14 transition-colors hover:bg-muted/40"
                >
                  {/* Order ID */}
                  <TableCell className="px-6">
                    <p className="font-medium text-sm">
                      #{order.id.slice(-13).toUpperCase()}
                    </p>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">{order.customer.fullName}</p>

                      <p className="text-xs text-muted-foreground">
                        {order.customer.phone}
                      </p>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell>
                    <div className="leading-tight">
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-right">
                    <span className="font-semibold text-green-600">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </TableCell>

                  {/* Payment */}
                  <TableCell>
                    <Badge variant="outline">{order.paymentType}</Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      className={
                        order.status === "COMPLETED"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-4">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full cursor-pointer"
                        onClick={() => onViewOrderDetails(order)}
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>

                      {/* <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full cursor-pointer"
                      >
                        <PrinterIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
