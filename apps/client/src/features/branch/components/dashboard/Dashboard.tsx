import {
  getPaymentBreakdown,
  getTodayOverview,
} from "@/app/store/branchAnalytics/branchAnalyticsThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import CashierPerformance from "@/features/branch/components/dashboard/CashierPerformance.tsx";

import PaymentBreakdown from "@/features/branch/components/dashboard/PaymentBreakdown.tsx";

import RecentOrders from "@/features/branch/components/dashboard/RecentOrders.tsx";

import SalesChart from "@/features/branch/components/dashboard/SalesChart.tsx";

import TodayOverview from "@/features/branch/components/dashboard/TodayOverview.tsx";

import TopProducts from "@/features/branch/components/dashboard/TopProducts.tsx";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const branch = useAppSelector((state) => state.branch.branch);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (branch?._id) {
      dispatch(getTodayOverview(branch?._id));
      dispatch(getPaymentBreakdown({ branchId: branch?._id, date: today }));
    }
  }, [dispatch, branch?._id]);
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Branch Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor sales, orders and branch performance
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
          <p className="text-sm font-medium text-foreground">{branch?.name}</p>
        </div>
      </div>

      {/* TODAY OVERVIEW */}
      <TodayOverview />

      {/* PAYMENT */}
      <PaymentBreakdown />

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SalesChart />

        <TopProducts />
      </div>

      {/* EXTRA DATA */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <CashierPerformance />

        <RecentOrders />
      </div>
    </div>
  );
}
