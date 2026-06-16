import PendingRequest from "@/features/super-admin/components/StoreModerationPage";
import StoreList from "@/features/super-admin/components/StoreList";
import SuperAdminDashboard from "@/features/super-admin/components/SuperAdminDashboard";
import SuperAdminLayout from "@/features/super-admin/components/SuperAdminLayout";
// import SuperAdminSetting from "@/features/super-admin/components/SuperAdminSetting";
import { Route, Routes } from "react-router";
import SubscriptionPage from "@/features/super-admin/components/subscription/SubscriptionPage";

export default function SuperAdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="stores" element={<StoreList />} />
        <Route path="requests" element={<PendingRequest />} />
        <Route path="subscriptions" element={<SubscriptionPage />} />
        {/* <Route path="settings" element={<SuperAdminSetting />} /> */}
      </Route>
    </Routes>
  );
}
