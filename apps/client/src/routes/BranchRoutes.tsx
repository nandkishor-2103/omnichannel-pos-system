import BranchLayout from "@/features/branch/components/branch-layout/BranchLayout.tsx";

import Dashboard from "@/features/branch/components/dashboard/Dashboard.tsx";
import BranchEmployee from "@/features/branch/components/employee/BranchEmployee.tsx";
import Inventory from "@/features/branch/components/inventory/Inventory.tsx";
import Orders from "@/features/branch/components/order/Orders.tsx";
import Reports from "@/features/branch/components/reports/Reports.tsx";
import Setting from "@/features/branch/components/settings/Setting.tsx";
import Transaction from "@/features/branch/components/transaction/Transaction.tsx";

import { Route, Routes } from "react-router-dom";

export default function BranchRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BranchLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="employees" element={<BranchEmployee />} />
        {/* <Route path="customers" element={<Customers />} /> */}
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Setting />} />
      </Route>
    </Routes>
  );
}
