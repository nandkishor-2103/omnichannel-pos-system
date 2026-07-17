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
import Signup from "./features/auth/Signup";
import VerifyOtp from "./features/auth/VerifyOtp";
import ResendVerificationOtp from "./features/auth/ResendVerificationOtp";
import Home from "./pages/Home";
import CreateStore from "./features/store/CreateStore";
import ContactSales from "./features/home/components/ContactSales";
import StorePending from "./pages/StorePending";
import StoreBlocked from "./pages/StoreBlocked";

export default function App() {
  return (
    <AuthInitializer>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/resend-verification-otp" element={<ResendVerificationOtp />} />

        <Route path="/contact-sales" element={<ContactSales />} />

        <Route path="/store-pending" element={<StorePending />} />

        <Route path="/store-blocked" element={<StoreBlocked />} />

        {/* <Route path="/create-store" element={<CreateStore />} /> */}

        <Route
          path="/create-store"
          element={
            <ProtectedRoute allowedRoles={["ROLE_STORE_ADMIN"]}>
              <CreateStore />
            </ProtectedRoute>
          }
        />

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

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster richColors position="top-right" />
    </AuthInitializer>
  );
}
