import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

import type { UserRole } from "@/features/auth/types/types";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAppSelector((state) => state.auth);

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (!allowedRoles.includes(user.role)) {
    const roleRoutes: Record<UserRole, string> = {
      ROLE_ADMIN: "/super-admin/dashboard",

      ROLE_STORE_ADMIN: "/store/dashboard",
      ROLE_STORE_MANAGER: "/store/dashboard",

      ROLE_BRANCH_ADMIN: "/branch/dashboard",
      ROLE_BRANCH_MANAGER: "/branch/dashboard",

      ROLE_BRANCH_CASHIER: "/cashier",
    };

    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  if (user.role === "ROLE_STORE_ADMIN" && user.store) {
    if (user.store.status === "PENDING") {
      return <Navigate to="/store-pending" replace />;
    }

    if (user.store.status === "BLOCKED") {
      return <Navigate to="/store-blocked" replace />;
    }
  }

  return <>{children}</>;
}
