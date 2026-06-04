export interface StoreOverview {
  totalStores: number;
  totalBranches: number;
  totalEmployees: number;
  totalRevenue: number;
  totalOrders: number;
}

export interface SalesTrend {
  label: string;
  value: number;
}

export interface MonthlySales {
  month: string;
  sales: number;
}

export interface DailySales {
  date: string;
  sales: number;
}

export interface CategorySale {
  category: string;
  amount: number;
}

export interface PaymentMethodSale {
  method: string;
  amount: number;
}

export interface BranchSale {
  branchId: string;
  branchName: string;
  amount: number;
}

export interface PaymentBreakdown {
  paymentType: string;
  amount: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  revenue: number;
  orders: number;
}

export interface StoreAlert {
  type: string;
  message: string;
}

export interface SalesTrendsPayload {
  storeAdminId: string;
  period: "daily" | "weekly" | "monthly";
}

export interface StoreAnalyticsState {
  storeOverview: StoreOverview | null;

  salesTrends: SalesTrend[] | null;
  monthlySales: MonthlySales[];
  dailySales: DailySales[];

  salesByCategory: CategorySale[];
  salesByPaymentMethod: PaymentMethodSale[];
  paymentBreakdown: PaymentBreakdown[];

  salesByBranch: BranchSale[];
  branchPerformance: BranchPerformance[] | null;

  storeAlerts: StoreAlert[] | null;

  loading: boolean;
  error: string | null;
}
