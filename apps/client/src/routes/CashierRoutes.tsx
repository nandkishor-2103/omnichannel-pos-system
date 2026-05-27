import { Route, Routes } from "react-router-dom";

import CashierDashboardLayout from "@/features/cashier/pages/CashierDashboardLayout";
import CreateOrderPage from "@/features/cashier/pages/CreateOrderPage";
import OrderHistoryPage from "@/features/cashier/pages/OrderHistoryPage";
import CustomerLookupPage from "@/features/cashier/pages/CustomerLookupPage";
import RefundPage from "@/features/cashier/pages/RefundPage";
import ShiftReportPage from "@/features/cashier/pages/ShiftReportPage";

export default function CashierRoutes() {
  return (
    <Routes>
      {/* LAYOUT ROUTE */}
      <Route path="/" element={<CashierDashboardLayout />}>
        {/* CHILD ROUTES */}
        <Route index element={<CreateOrderPage />} />
        <Route path="orders" element={<OrderHistoryPage />} />
        <Route path="customers" element={<CustomerLookupPage />} />
        <Route path="returns" element={<RefundPage />} />
        <Route path="shift-summary" element={<ShiftReportPage />} />
      </Route>
    </Routes>
  );
}
