import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DownloadIcon } from "lucide-react";

import OrderDetails from "@/features/cashier/components/order-history/OrderDetails";
import OrderTable from "@/features/cashier/components/order-history/OrderTable";

import type { Order } from "../types/order";

export default function OrderHistoryPage() {
  const [showOrderInvoiceDialog, setShowOrderInvoiceDialog] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleViewOrderDetails(order: Order) {
    setSelectedOrder(order);
    setShowOrderInvoiceDialog(true);
  }

  return (
    <div className="flex flex-col overflow-hidden bg-muted/20">
      <div className="flex-1 px-2 py-1">
        <div className="rounded-2xl border bg-background shadow-sm">
          <OrderTable onViewOrderDetails={handleViewOrderDetails} />
        </div>
      </div>

      <Dialog open={showOrderInvoiceDialog} onOpenChange={setShowOrderInvoiceDialog}>
        <DialogContent className="min-w-[900px] rounded-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          </DialogHeader>

          <OrderDetails selectedOrder={selectedOrder} />

          <DialogFooter className="border-t pt-4">
            <Button className="cursor-pointer gap-2 rounded-xl">
              <DownloadIcon className="h-4 w-4" />
              Download Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
