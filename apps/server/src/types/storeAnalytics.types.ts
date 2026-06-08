export interface StoreOverviewDto {
  totalBranches: number;

  totalSales: number;

  totalOrders: number;

  totalEmployees: number;

  totalCustomers: number;

  totalRefunds: number;

  totalProducts: number;

  topBranchName: string | null;
}

export interface TimeSeriesPointDto {
  date: Date;

  totalAmount: number;
}

export interface TimeSeriesDataDto {
  period: "DAILY" | "WEEKLY" | "MONTHLY";

  points: TimeSeriesPointDto[];
}

export interface CategorySalesDto {
  categoryId: string;
  categoryName: string;
  totalSales: number;
  quantitySold: number;
}

export interface PaymentInsightDto {
  paymentMethod: string;

  totalAmount: number;
}

export interface BranchSalesDto {
  branchName: string;

  totalSales: number;
}

export interface BranchPerformanceDto {
  branchSales: BranchSalesDto[];

  newBranchesThisMonth: number;

  topBranch: string | null;
}

export interface StoreAlertDto {
  lowStockCount: number;
  lowStockAlerts: unknown[];

  noSalesToday: unknown[];

  refundSpikeAlerts: unknown[];

  inactiveCashiers: unknown[];
}
