import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./features/auth/Login";

import StoreRoutes from "./routes/StoreRoutes";
import BranchRoutes from "./routes/BranchRoutes";
import CashierRoutes from "./routes/CashierRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthInitializer from "./routes/AuthInitializer";
import { Toaster } from "./components/ui/sonner";
import NotFound from "./components/shared/NotFound";

export default function App() {
  return (
    <AuthInitializer>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        {/* Super Admin */}
        <Route
          path="/super-admin/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <SuperAdminRoutes />
            </ProtectedRoute>
          }
        />

        {/* Store */}
        <Route
          path="/store/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_STORE_ADMIN", "ROLE_STORE_MANAGER"]}>
              <StoreRoutes />
            </ProtectedRoute>
          }
        />

        {/* Branch */}
        <Route
          path="/branch/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_BRANCH_ADMIN", "ROLE_BRANCH_MANAGER"]}>
              <BranchRoutes />
            </ProtectedRoute>
          }
        />

        {/* Cashier */}
        <Route
          path="/cashier/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_BRANCH_CASHIER"]}>
              <CashierRoutes />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound/>} />
      </Routes>

      <Toaster richColors position="top-right" />
    </AuthInitializer>
  );
}
