import { useEffect, useState } from "react";
import { DownloadIcon, X } from "lucide-react";

import OrderDetails from "@/features/cashier/components/order-history/OrderDetails";
import OrderTable from "@/features/cashier/components/order-history/OrderTable";

import type { Order as StoreOrder } from "@/app/store/order/orderTypes";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getOrdersByCashier } from "@/app/store/order/orderThunk";

export default function OrderHistoryPage() {
  const dispatch = useAppDispatch();
  const [showOrderInvoiceDialog, setShowOrderInvoiceDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<StoreOrder | null>(null);

  const user = useAppSelector((state) => state.user.userProfile);

  function handleViewOrderDetails(order: StoreOrder) {
    setSelectedOrder(order);
    setShowOrderInvoiceDialog(true);
  }

  function handleClose() {
    setShowOrderInvoiceDialog(false);
  }

  useEffect(() => {
    if (user?.id) {
      dispatch(getOrdersByCashier(user?.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (showOrderInvoiceDialog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showOrderInvoiceDialog]);

  return (
    <div className="flex flex-col overflow-hidden bg-muted/20">
      <div className="flex-1 px-2 py-1">
        <div className="rounded-2xl border bg-background shadow-sm">
          <OrderTable onViewOrderDetails={handleViewOrderDetails} />
        </div>
      </div>

      {showOrderInvoiceDialog && (
        /* Full-screen overlay, centres the panel, pads away from edges */
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          
          <div
            className="
              relative flex flex-col
              w-full max-w-3xl
              max-h-[calc(100dvh-2rem)]
              bg-white rounded-2xl shadow-2xl
              overflow-hidden
            "
          >
            {/* ── Header ── always visible, never scrolls */}
            <div className="shrink-0 flex items-center justify-between border-b px-4 py-4 sm:px-6 sm:py-5">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Order Details
              </h2>
              <button
                onClick={handleClose}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>


            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <OrderDetails selectedOrder={selectedOrder} />
            </div>

            {/* ── Footer ── always visible, never scrolls */}
            <div className="shrink-0 flex justify-end border-t px-4 py-3 sm:px-6 sm:py-4 bg-white">
              <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer w-full sm:w-auto justify-center">
                <DownloadIcon className="h-4 w-4" />
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
