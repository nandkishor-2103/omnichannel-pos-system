import type { ReactNode } from "react";

export type StoreDashboardStats = {
  title: string;
  value: number;
  isCurrency: boolean;
  icon: ReactNode;
};

export type RecentSalesData = {
  branch: string;
  amount: string;
  date: string;
};
