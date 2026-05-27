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

type OrderStatus = "Completed" | "Pending" | "Cancelled";

type RecentOrder = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

const recentOrders: RecentOrder[] = [
  {
    id: "#ORD-1001",
    customerName: "John Doe",
    totalAmount: 2500,
    status: "Completed",
    createdAt: "2025-07-08T10:30:00",
  },
  {
    id: "#ORD-1002",
    customerName: "Emma Watson",
    totalAmount: 4200,
    status: "Pending",
    createdAt: "2025-07-08T11:10:00",
  },
  {
    id: "#ORD-1003",
    customerName: "Michael Scott",
    totalAmount: 1800,
    status: "Completed",
    createdAt: "2025-07-08T12:05:00",
  },
  {
    id: "#ORD-1004",
    customerName: "Sophia Lee",
    totalAmount: 3200,
    status: "Cancelled",
    createdAt: "2025-07-08T12:45:00",
  },
  {
    id: "#ORD-1005",
    customerName: "David Miller",
    totalAmount: 5100,
    status: "Completed",
    createdAt: "2025-07-08T01:20:00",
  },
  {
    id: "#ORD-1006",
    customerName: "Olivia Brown",
    totalAmount: 2900,
    status: "Pending",
    createdAt: "2025-07-08T02:15:00",
  },
  {
    id: "#ORD-1007",
    customerName: "James Wilson",
    totalAmount: 3600,
    status: "Completed",
    createdAt: "2025-07-08T03:40:00",
  },
  {
    id: "#ORD-1008",
    customerName: "Ava Davis",
    totalAmount: 2700,
    status: "Cancelled",
    createdAt: "2025-07-08T04:30:00",
  },
  {
    id: "#ORD-1009",
    customerName: "William Johnson",
    totalAmount: 4300,
    status: "Completed",
    createdAt: "2025-07-08T05:50:00",
  },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";

    case "Pending":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";

    case "Cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20";

    default:
      return "";
  }
};

export default function RecentOrders() {
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
                    {order.id}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {order.customerName}
                  </TableCell>

                  <TableCell className="font-medium text-foreground">
                    ₹{order.totalAmount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.status)}>
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
