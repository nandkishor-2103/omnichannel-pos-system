import PendingRequest from "@/features/super-admin/components/PendingRequest";
import StoreList from "@/features/super-admin/components/StoreList";
import Subscription from "@/features/super-admin/components/subscription/Subscription";
import SuperAdminDashboard from "@/features/super-admin/components/SuperAdminDashboard";
import SuperAdminLayout from "@/features/super-admin/components/SuperAdminLayout";
import SuperAdminSetting from "@/features/super-admin/components/SuperAdminSetting";
import { Route, Routes } from "react-router";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="stores" element={<StoreList />} />
        <Route path="requests" element={<PendingRequest />} />
        <Route path="subscriptions" element={<Subscription />} />
        <Route path="settings" element={<SuperAdminSetting />} />
      </Route>
    </Routes>
  );
}
