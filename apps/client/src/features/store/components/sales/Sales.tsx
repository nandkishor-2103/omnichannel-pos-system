import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  getDailySales,
  getSalesByPaymentMethod,
} from "@/app/store/storeAnalytics/storeAnalyticsThunk";

import SalesHeader from "./SalesHeader";
import SalesSummaryCards from "./SalesSummaryCards";
import DailySalesChart from "./DailySalesChart";
import PaymentMethodChart from "./PaymentMethodChart";

export default function Sales() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const dailySales = useAppSelector((state) => state.storeAnalytics.dailySales);

  const salesByPaymentMethod = useAppSelector(
    (state) => state.storeAnalytics.salesByPaymentMethod
  );

  const [selectedBranch, setSelectedBranch] = useState("ALL");

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getDailySales(user.store.id));
      dispatch(getSalesByPaymentMethod(user.store.id));
    }
  }, [dispatch, user?.store?.id]);

  const branches = useMemo(
    () => ["ALL", ...new Set(dailySales.map((d) => d.branchName))],
    [dailySales]
  );

  const filteredSales = useMemo(() => {
    if (selectedBranch === "ALL") {
      return dailySales;
    }

    return dailySales.filter((sale) => sale.branchName === selectedBranch);
  }, [dailySales, selectedBranch]);

  const totalSales = useMemo(
    () => filteredSales.reduce((sum, item) => sum + item.sales, 0),
    [filteredSales]
  );

  const chartData = useMemo(() => {
    const grouped: Record<
      string,
      {
        date: string;
        sales: number;
        branchName: string;
      }
    > = {};

    filteredSales.forEach((item) => {
      const date = new Date(item.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      if (!grouped[date]) {
        grouped[date] = {
          date,
          sales: 0,
          branchName: selectedBranch === "ALL" ? "All Branches" : item.branchName,
        };
      }

      grouped[date].sales += item.sales;
    });

    return Object.values(grouped);
  }, [filteredSales, selectedBranch]);

  return (
    <div className="space-y-6">
      <SalesHeader
        branches={branches}
        selectedBranch={selectedBranch}
        onBranchChange={setSelectedBranch}
      />

      <SalesSummaryCards
        totalSales={totalSales}
        paymentMethodsCount={salesByPaymentMethod.length}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DailySalesChart data={chartData} />

        <PaymentMethodChart data={salesByPaymentMethod} />
      </div>
    </div>
  );
}
