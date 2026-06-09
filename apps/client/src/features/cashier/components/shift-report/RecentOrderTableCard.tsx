import { useAppSelector } from "@/app/store/hooks";

import { Badge } from "@/components/ui/badge";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreditCardIcon, IndianRupeeIcon, Smartphone, Wallet } from "lucide-react";

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "CASH":
      return <Wallet className="h-4 w-4" />;

    case "UPI":
      return <Smartphone className="h-4 w-4" />;

    case "CARD":
      return <CreditCardIcon className="h-4 w-4" />;

    default:
      return <Wallet className="h-4 w-4" />;
  }
};

export default function RecentOrderTableCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const recentOrders = [...(currentShift?.recentOrders ?? [])]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>

          <div className="rounded-lg border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
            {recentOrders.length} Orders
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {recentOrders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No recent orders available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableHead className="pl-6">Order</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="transition hover:bg-accent/40">
                  {/* Order */}
                  <TableCell className="pl-6">
                    <div>
                      <p className="font-semibold">
                        ORD-{order.id.slice(-6).toUpperCase()}
                      </p>

                      <p className="text-xs text-muted-foreground">Recent Purchase</p>
                    </div>
                  </TableCell>

                  {/* Time */}
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>

                  {/* Payment */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg border bg-background p-2">
                        {getPaymentIcon(order.paymentType)}
                      </div>

                      <Badge variant="outline">{order.paymentType}</Badge>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        order.status === "COMPLETED"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : "border-red-200 bg-red-50 text-red-700"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="pr-6 text-right">
                    <div className="inline-flex items-center rounded-lg border bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-700">
                      <IndianRupeeIcon className="mr-1 h-4 w-4" />
                      {order.totalAmount.toFixed(2)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
