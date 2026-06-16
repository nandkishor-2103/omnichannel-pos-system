import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/app/store/hooks";

import FullPageLoader from "@/components/shared/FullPageLoader";

export default function SubscriptionGuard() {
  const { currentSubscription, loadingCurrent } = useAppSelector(
    (state) => state.storeSubscription
  );

  if (loadingCurrent) {
    return <FullPageLoader />;
  }

  const hasActiveSubscription =
    currentSubscription &&
    currentSubscription.status === "ACTIVE" &&
    new Date(currentSubscription.endDate) > new Date();

  if (!hasActiveSubscription) {
    return <Navigate to="/store/upgrade" replace />;
  }

  return <Outlet />;
}
