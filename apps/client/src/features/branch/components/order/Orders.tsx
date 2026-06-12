import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw, CreditCard, Banknote } from "lucide-react";

import OrderDetailsDialog from "@/features/branch/components/order/OrderDetailsDialog.tsx";

import OrdersTable from "@/features/branch/components/order/OrdersTable.tsx";

import type { Order } from "@/app/store/order/orderTypes";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks.ts";
import { getTodayOrdersByBranch } from "@/app/store/order/orderThunk.ts";
import { generateInvoice } from "@/lib/generateInvoice";

export default function Orders() {
  const dispatch = useAppDispatch();
  const todayOrders = useAppSelector((state) => state.order.todayOrders);
  const orders = todayOrders;
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  console.log("Today Orders: ", todayOrders);
  const branch = useAppSelector((state) => state.branch.branch);

  useEffect(() => {
    if (branch?._id) {
      dispatch(getTodayOrdersByBranch(branch._id));
    }
  }, [dispatch, branch?._id]);

  const handleRefresh = async () => {
    if (!branch?._id) return;

    try {
      setLoading(true);

      await dispatch(getTodayOrdersByBranch(branch._id)).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    const order = todayOrders.find((o) => o.id === id) || null;

    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handlePrintInvoice = (id: string) => {
    const order = todayOrders.find((o) => o.id === id);

    if (!order) return;

    generateInvoice(order);
  };

  const getPaymentIcon = (type: Order["paymentType"]) => {
    switch (type) {
      case "CASH":
        return <Banknote className="h-4 w-4 text-green-600" />;
      case "CARD":
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case "UPI":
        return <CreditCard className="h-4 w-4 text-purple-600" />;
    }
  };

  const getStatusColor = (status: Order["status"]): string => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Orders</h1>

        <Button
          variant="outline"
          className="gap-2 cursor-pointer"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="h-[550px] overflow-y-auto">
        <OrdersTable
          orders={orders}
          loading={loading}
          onViewDetails={handleViewDetails}
          onPrintInvoice={handlePrintInvoice}
          getStatusColor={getStatusColor}
          getPaymentIcon={getPaymentIcon}
        />
      </div>

      <OrderDetailsDialog
        open={showDetails}
        onOpenChange={setShowDetails}
        selectedOrder={selectedOrder}
        getStatusColor={getStatusColor}
        getPaymentIcon={getPaymentIcon}
      />
    </div>
  );
}
