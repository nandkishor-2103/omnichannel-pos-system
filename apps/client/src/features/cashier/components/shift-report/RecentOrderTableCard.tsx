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
import { CreditCard, IndianRupeeIcon, Smartphone, Wallet } from "lucide-react";

type RecentOrder = {
  id: number;
  createdAt: string;
  paymentType: "CASH" | "CARD" | "UPI";
  totalAmount: number;
  icon: React.ReactElement;
};

type ShiftData = {
  recentOrders: RecentOrder[];
};

const shiftData: ShiftData = {
  recentOrders: [
    {
      id: 34648483638,
      createdAt: "01:25 PM",
      paymentType: "CASH",
      totalAmount: 7899,
      icon: <Wallet />,
    },
    {
      id: 34648483639,
      createdAt: "02:10 PM",
      paymentType: "UPI",
      totalAmount: 1250,
      icon: <Smartphone />,
    },
    {
      id: 34648483640,
      createdAt: "03:45 PM",
      paymentType: "CARD",
      totalAmount: 4599,
      icon: <CreditCard />,
    },
    {
      id: 34648483641,
      createdAt: "04:30 PM",
      paymentType: "CASH",
      totalAmount: 3500,
      icon: <Wallet />,
    },
  ],
};

export default function RecentOrderTableCard() {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>

          <div className="rounded-lg border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
            {shiftData.recentOrders.length} orders
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20 hover:bg-muted/20">
              <TableHead className="pl-6">Order</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="pr-6 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shiftData.recentOrders.map((order) => (
              <TableRow key={order.id} className="transition hover:bg-accent/40">
                {/* Order Info */}
                <TableCell className="pl-6">
                  <div className="space-y-1">
                    <p className="font-semibold">ORD-{order.id.toString().slice(-6)}</p>

                    <p className="text-xs text-muted-foreground">Recent Purchase</p>
                  </div>
                </TableCell>

                {/* Time */}
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{order.createdAt}</p>

                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </TableCell>

                {/* Payment */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      {order.icon}
                    </div>

                    <Badge
                      variant="outline"
                      className="
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    tracking-wide
                  "
                    >
                      {order.paymentType}
                    </Badge>
                  </div>
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
      </CardContent>
    </Card>
  );
}
