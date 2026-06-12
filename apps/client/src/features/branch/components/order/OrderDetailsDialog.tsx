import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Order } from "@/app/store/order/orderTypes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrder: Order | null;
  getStatusColor: (status: Order["status"]) => string;
  getPaymentIcon: (type: Order["paymentType"]) => React.ReactNode;
};

export default function OrderDetailsDialog({
  open,
  onOpenChange,
  selectedOrder,
  getStatusColor,
  getPaymentIcon,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <strong>Order ID:</strong> {selectedOrder.id}
            </div>

            <div>
              <strong>Customer:</strong> {selectedOrder.customer.fullName}
            </div>

            <div>
              <strong>Cashier:</strong> {selectedOrder.cashier.fullName}
            </div>

            <div>
              <strong>Status:</strong>{" "}
              <Badge className={getStatusColor(selectedOrder.status)}>
                {selectedOrder.status}
              </Badge>
            </div>

            <div>
              <strong>Payment:</strong>{" "}
              <span className="inline-flex items-center gap-1">
                {getPaymentIcon(selectedOrder.paymentType)}
                {selectedOrder.paymentType}
              </span>
            </div>

            <div>
              <strong>Amount:</strong> ₹{selectedOrder.totalAmount}
            </div>

            <div>
              <strong>Items:</strong>
              <div className="mt-2 space-y-2">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between rounded-md border p-2">
                    <span>{item.product?.name}</span>

                    <span>
                      {item.quantity} × ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DialogClose asChild>
              <Button className="w-full mt-4 cursor-pointer" variant="outline">
                Close
              </Button>
            </DialogClose>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
