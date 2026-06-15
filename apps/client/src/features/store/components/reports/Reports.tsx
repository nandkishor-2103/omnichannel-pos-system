import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  getMonthlySales,
  getSalesByCategory,
} from "@/app/store/storeAnalytics/storeAnalyticsThunk";

import ReportsHeader from "./ReportsHeader";
import ReportsSummaryCards from "./ReportsSummaryCards";

import BranchFilterCombobox from "./BranchFilterCombobox";
import CategoryFilterCombobox from "./CategoryFilterCombobox";

import MonthlySalesChart from "./MonthlySalesChart";
import CategorySalesChart from "./CategorySalesChart";

export default function Reports() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const monthlySales = useAppSelector((state) => state.storeAnalytics.monthlySales);

  const salesByCategory = useAppSelector((state) => state.storeAnalytics.salesByCategory);

  const [selectedBranch, setSelectedBranch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getMonthlySales(user.store.id));
      dispatch(getSalesByCategory(user.store.id));
    }
  }, [dispatch, user?.store?.id]);

  /**
   * Branch Combobox Options
   */
  const branchOptions = useMemo(() => {
    return Array.from(new Set(monthlySales.map((item) => item.branchName)))
      .sort()
      .map((branchName) => ({
        _id: branchName,
        name: branchName,
      }));
  }, [monthlySales]);

  /**
   * Category Combobox Options
   */
  const categoryOptions = useMemo(() => {
    const sortedCategories = [...salesByCategory];

    sortedCategories.sort((a, b) => b.amount - a.amount);

    return sortedCategories.map((item) => ({
      categoryName: item.category,
      totalSales: item.amount,
    }));
  }, [salesByCategory]);

  /**
   * Monthly Sales Filter
   */
  const filteredMonthlySales = useMemo(() => {
    if (!selectedBranch) {
      return monthlySales;
    }

    return monthlySales.filter((item) => item.branchName === selectedBranch);
  }, [monthlySales, selectedBranch]);

  /**
   * Monthly Chart Data
   */
  const monthlyChartData = useMemo(() => {
    return filteredMonthlySales.map((item) => ({
      month: new Date(item.date).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      }),
      sales: item.totalAmount,
      branchName: item.branchName,
    }));
  }, [filteredMonthlySales]);

  /**
   * Category Chart Data
   */
  const categoryChartData = useMemo(() => {
    const sortedCategories = [...salesByCategory]
      .sort((a, b) => b.amount - a.amount)
      .map((item) => ({
        categoryName: item.category,
        totalSales: item.amount,
        selected: item.category === selectedCategory,
      }));

    // Default Top 5
    if (!selectedCategory) {
      return sortedCategories.slice(0, 5);
    }

    const selectedIndex = sortedCategories.findIndex(
      (item) => item.categoryName === selectedCategory
    );

    if (selectedIndex === -1) {
      return sortedCategories.slice(0, 5);
    }

    let start = Math.max(0, selectedIndex - 2);
    let end = start + 5;

    if (end > sortedCategories.length) {
      end = sortedCategories.length;
      start = Math.max(0, end - 5);
    }

    return sortedCategories.slice(start, end);
  }, [salesByCategory, selectedCategory]);

  /**
   * Summary Cards
   */
  const totalSales = useMemo(() => {
    return filteredMonthlySales.reduce((sum, item) => sum + item.totalAmount, 0);
  }, [filteredMonthlySales]);

  const totalCategories = useMemo(() => {
    return salesByCategory.length;
  }, [salesByCategory]);

  const totalBranches = useMemo(() => {
    return branchOptions.length;
  }, [branchOptions]);

  return (
    <div className="space-y-6">
      <ReportsHeader />

      <ReportsSummaryCards
        totalSales={totalSales}
        totalCategories={totalCategories}
        totalBranches={totalBranches}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <BranchFilterCombobox
          branches={branchOptions}
          value={selectedBranch}
          onChange={setSelectedBranch}
        />

        <CategoryFilterCombobox
          categories={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <MonthlySalesChart data={monthlyChartData} />

        <CategorySalesChart data={categoryChartData} />
      </div>
    </div>
  );
}
