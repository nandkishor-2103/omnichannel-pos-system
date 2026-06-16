import { Route, Routes } from "react-router";

import Branches from "@/features/store/components/branch/Branches";
import Category from "@/features/store/components/category/Category";
import StoreDashboard from "@/features/store/components/dashboard/StoreDashboard";
import StoreDashboardLayout from "@/features/store/components/dashboard/StoreDashboardLayout";
import StoreEmployee from "@/features/store/components/employee/StoreEmployee";
import Products from "@/features/store/components/product/Products";
import Reports from "@/features/store/components/reports/Reports";
import Sales from "@/features/store/components/sales/Sales";
import StoreInfo from "@/features/store/components/store-info/StoreInfo";
import Upgrade from "@/features/store/components/upgrade/Upgrade";

import SubscriptionGuard from "@/routes/SubscriptionGuard";

export default function StoreRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StoreDashboardLayout />}>
        {/* Always accessible */}
        <Route path="upgrade" element={<Upgrade />} />

        {/* Requires active subscription */}
        <Route element={<SubscriptionGuard />}>
          <Route index element={<StoreDashboard />} />
          <Route path="dashboard" element={<StoreDashboard />} />
          <Route path="branches" element={<Branches />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Category />} />
          <Route path="employees" element={<StoreEmployee />} />
          <Route path="sales" element={<Sales />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<StoreInfo />} />
        </Route>
      </Route>
    </Routes>
  );
}
