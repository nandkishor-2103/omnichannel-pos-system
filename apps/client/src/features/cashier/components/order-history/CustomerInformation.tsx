import { Card, CardContent } from "@/components/ui/card";

import type { Order } from "../../types/order";

interface CustomerInformationProps {
  selectedOrder: Order;
}

export default function CustomerInformation({ selectedOrder }: CustomerInformationProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="space-y-4 p-5">
        <h3 className="text-lg font-bold">Customer Information</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name</span>

            <span className="font-medium">{selectedOrder.customer.fullName}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Phone</span>

            <span>{selectedOrder.customer.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}