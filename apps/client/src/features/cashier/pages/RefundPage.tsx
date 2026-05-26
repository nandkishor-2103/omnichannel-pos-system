import { useState } from "react";

import OrderDetailsSection from "../components/refund/OrderDetailsSection";
import OrderTable from "../components/refund/OrderTable";
import ReturnItemSection from "../components/refund/ReturnItemSection";
import ReturnReceiptDialog from "../components/refund/ReturnReceiptDialog";

import type { Order } from "../types/refund";

export default function RefundPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showReturnReceiptDialog, setShowReturnReceiptDialog] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="px-6 py-3">
          <h1 className="text-3xl font-bold tracking-tight">Return / Refund</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer returns and refunds
          </p>
        </div>
      </div>

      {/* Content */}
      {!selectedOrder ? (
        <div className=" p-6">
          <OrderTable onViewOrderDetails={setSelectedOrder} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-2">
          <OrderDetailsSection
            selectedOrder={selectedOrder}
            onViewOrderDetails={setSelectedOrder}
          />

          <ReturnItemSection
            selectedOrder={selectedOrder}
            setShowReturnReceiptDialog={setShowReturnReceiptDialog}
          />
        </div>
      )}

      {selectedOrder && (
        <ReturnReceiptDialog
          selectedOrder={selectedOrder}
          showReturnReceiptDialog={showReturnReceiptDialog}
          setShowReturnReceiptDialog={setShowReturnReceiptDialog}
        />
      )}
    </div>
  );
}
