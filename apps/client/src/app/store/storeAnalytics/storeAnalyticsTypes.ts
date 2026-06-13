export interface StoreOverviewData {
  totalBranches: number;
  totalSales: number;
  totalOrders: number;
  totalEmployees: number;
  totalCustomers: number;
  totalRefunds: number;
  totalProducts: number;
  topBranchName: string | null;
}

export interface StoreOverviewResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    overview: StoreOverviewData;
  };
}

export interface TodaySalesByBranch {
  branchId: string;
  branchName: string;
  totalSales: number;
  totalOrders: number;
}

export interface TodaySalesByBranchResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    sales: TodaySalesByBranch[];
  };
}

export interface SalesTrend {
  salesTrends: SalesTrendPoint[];
}

export interface SalesTrendPoint {
  date: string;
  totalAmount: number;
  branchName: string;
}

export interface SalesTrendsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    trends: {
      period: "DAILY" | "WEEKLY" | "MONTHLY";
      points: SalesTrendPoint[];
    };
  };
}

export interface MonthlySales {
  month: string;
  sales: number;
  branchName: string;
}

export interface DailySales {
  date: string;
  sales: number;
  branchName: string;
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
  storeId: string;
  period: "DAILY" | "WEEKLY" | "MONTHLY";
}

export interface StoreAnalyticsState {
  storeOverview: StoreOverviewData | null;

  salesTrends: SalesTrendPoint[];

  monthlySales: MonthlySales[];
  dailySales: DailySales[];

  salesByCategory: CategorySale[];
  salesByPaymentMethod: PaymentMethodSale[];
  paymentBreakdown: PaymentBreakdown[];

  salesByBranch: BranchSale[];

  todaySalesByBranch: TodaySalesByBranch[];

  branchPerformance: BranchPerformance[] | null;

  storeAlerts: StoreAlert[] | null;

  loading: boolean;
  error: string | null;
}
