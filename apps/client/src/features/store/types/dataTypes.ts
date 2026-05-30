import type { ReactNode } from "react";

export type StoreDashboardStats = {
  title: string;
  value: number;
  icon: ReactNode;
  change: number;
  loading: boolean;
};

export type RecentSalesData = {
  branch: string;
  amount: string;
  date: string;
};
