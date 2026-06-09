import { useState } from "react";

import OrderDetailsSection from "../components/refund/OrderDetailsSection";
import OrderTable from "../components/refund/OrderTable";
import ReturnItemSection from "../components/refund/ReturnItemSection";
import ReturnReceiptDialog from "../components/refund/ReturnReceiptDialog";

// import type { Order } from "../types/refund";
import type { Order } from "@/app/store/order/orderTypes";

export default function RefundPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [showReturnReceiptDialog, setShowReturnReceiptDialog] = useState(false);

  return (
    <div className=" overflow-hidden bg-muted/30">
      {/* Content */}
      {!selectedOrder ? (
        <div className="p-2">
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
          onComplete={() => {
            setSelectedOrder(null);
            setShowReturnReceiptDialog(false);
          }}
        />
      )}
    </div>
  );
}
