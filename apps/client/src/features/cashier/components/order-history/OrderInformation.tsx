import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Order } from "../../types/order";

interface OrderInformationProps {
  selectedOrder: Order;
}

export default function OrderInformation({ selectedOrder }: OrderInformationProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="space-y-4 p-5">
        <h3 className="text-lg font-bold">Order Information</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>

            <span className="font-medium">#{selectedOrder.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>

            <span>{selectedOrder.createdAt}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Status</span>

            <Badge>{selectedOrder.status}</Badge>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>

            <span>{selectedOrder.paymentType}</span>
          </div>

          <div className="flex justify-between border-t pt-3 text-base font-bold">
            <span>Total Amount</span>

            <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}