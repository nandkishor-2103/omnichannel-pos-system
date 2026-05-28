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
import { Search, FileText, ArrowUpDown } from "lucide-react";

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
//   loading,
  onViewDetails,
  onPrintInvoice,
  getStatusColor,
  getPaymentIcon,
}: Props) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="max-h-[480px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            <TableRow>
              {[
                "Order ID",
                "Customer",
                "Cashier",
                "Date",
                "Amount",
                "Payment",
                "Status",
                "Actions",
              ].map((head) => (
                <TableHead key={head    }>
                  <div className={`flex items-center gap-1 text-xs font-semibold text-gray-600 ${head === "Actions" ? "justify-end" : ""}`}>
                    {head}
                    <ArrowUpDown className="h-3 w-3 opacity-60" />
                  </div>
                </TableHead>
              ))}
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
                  <div className="flex justify-end gap-1">
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
      </div>
    </div>
  );
}
