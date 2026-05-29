import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Search, FileText } from "lucide-react";

import type { Order } from "../../types/order.ts";

type Props = {
  orders: Order[];
  loading: boolean;
  onViewDetails: (id: string) => void;
  onPrintInvoice: (id: string) => void;
  getStatusColor: (status: Order["status"]) => string;
  getPaymentIcon: (type: Order["paymentType"]) => React.ReactNode;
};

export default function OrdersTable({
  orders,
  // loading,
  onViewDetails,
  onPrintInvoice,
  getStatusColor,
  getPaymentIcon,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Cashier</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>

            <TableCell>{order.customer}</TableCell>

            <TableCell>{order.cashier}</TableCell>

            <TableCell>{order.createdAt}</TableCell>

            <TableCell>₹{order.totalAmount}</TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                {getPaymentIcon(order.paymentType)}
                {order.paymentType}
              </div>
            </TableCell>

            <TableCell>
              <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
            </TableCell>

            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onViewDetails(order.id)}
                >
                  <Search className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onPrintInvoice(order.id)}
                >
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
