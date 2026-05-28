import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { RefreshCw, CreditCard, Banknote } from "lucide-react";

import OrderDetailsDialog from "@/features/branch/components/order/OrderDetailsDialog.tsx";

import OrdersTable from "@/features/branch/components/order/OrdersTable.tsx";

import type { Order } from "../../types/order.ts";

const initialOrders: Order[] = [
  {
    id: "ORD-1001",
    customer: "Amit Sharma",
    cashier: "Ravi Kumar",
    createdAt: "2026-05-20",
    totalAmount: 1250,
    paymentType: "UPI",
    status: "COMPLETED",
  },
  {
    id: "ORD-1002",
    customer: "Neha Verma",
    cashier: "Suresh Patel",
    createdAt: "2026-05-21",
    totalAmount: 890,
    paymentType: "CARD",
    status: "PENDING",
  },
  {
    id: "ORD-1003",
    customer: "John Doe",
    cashier: "Ravi Kumar",
    createdAt: "2026-05-22",
    totalAmount: 540,
    paymentType: "CASH",
    status: "CANCELLED",
  },
  {
    id: "ORD-1004",
    customer: "Priya Singh",
    cashier: "Suresh Patel",
    createdAt: "2026-05-23",
    totalAmount: 2300,
    paymentType: "CARD",
    status: "COMPLETED",
  },
  {
    id: "ORD-1005",
    customer: "Rahul Mehta",
    cashier: "Ravi Kumar",
    createdAt: "2026-05-24",
    totalAmount: 670,
    paymentType: "UPI",
    status: "PENDING",
  },
  {
    id: "ORD-1006",
    customer: "Anjali Desai",
    cashier: "Suresh Patel",
    createdAt: "2026-05-25",
    totalAmount: 1500,
    paymentType: "CASH",
    status: "COMPLETED",
  },
  {
    id: "ORD-1007",
    customer: "Vikram Singh",
    cashier: "Ravi Kumar",
    createdAt: "2026-05-26",
    totalAmount: 980,
    paymentType: "CARD",
    status: "CANCELLED",
  },
  {
    id: "ORD-1008",
    customer: "Sonal Gupta",
    cashier: "Suresh Patel",
    createdAt: "2026-05-27",
    totalAmount: 1200,
    paymentType: "UPI",
    status: "COMPLETED",
  },
];

export default function Orders() {
  const [orders] = useState<Order[]>(initialOrders);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
  };

  const handleViewDetails = (id: string) => {
    const order = orders.find((o) => o.id === id) || null;
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const handlePrintInvoice = (id: string) => {
    console.log("Print invoice:", id);
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

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <Button
          variant="outline"
          className="gap-2"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>



      <OrdersTable
        orders={orders}
        loading={loading}
        onViewDetails={handleViewDetails}
        onPrintInvoice={handlePrintInvoice}
        getStatusColor={getStatusColor}
        getPaymentIcon={getPaymentIcon}
      />

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
