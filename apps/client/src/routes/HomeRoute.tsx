import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

type Props = {
  children: React.ReactNode;
};

export default function HomeRoute({ children }: Props) {
  const user = useAppSelector((state) => state.auth.user);

  if (user && !["ROLE_ADMIN", "ROLE_STORE_ADMIN"].includes(user.role)) {
    switch (user.role) {
      case "ROLE_STORE_MANAGER":
        return <Navigate to="/store/dashboard" replace />;

      case "ROLE_BRANCH_ADMIN":
      case "ROLE_BRANCH_MANAGER":
        return <Navigate to="/branch/dashboard" replace />;

      case "ROLE_BRANCH_CASHIER":
        return <Navigate to="/cashier" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
}
