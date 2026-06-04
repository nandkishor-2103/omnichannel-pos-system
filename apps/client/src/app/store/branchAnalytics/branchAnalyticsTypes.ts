export interface DailySales {
  date: string;
  totalSales: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  quantity: number;
  percentage: number;
}

export interface TopCashier {
  cashierId: string;
  cashierName: string;
  revenue: number;
}

export interface CategorySales {
  categoryId: string;
  categoryName: string;
  totalSales: number;
}

export interface PaymentBreakdown {
  paymentType: string;
  amount: number;
}

export interface TodayOverview {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

export interface DailySalesResponse {
  dailySales: DailySales[];
}

export interface TopProductsResponse {
  topProducts: TopProduct[];
}

export interface TopCashiersResponse {
  topCashiers: TopCashier[];
}

export interface CategorySalesResponse {
  categorySales: CategorySales[];
}

export interface TodayOverviewResponse {
  overview: TodayOverview;
}

export interface PaymentBreakdownResponse {
  paymentBreakdown: PaymentBreakdown[];
}

export interface DailySalesPayload {
  branchId: string;
  days?: number;
}

export interface CategorySalesPayload {
  branchId: string;
  date: string;
}

export interface PaymentBreakdownPayload {
  branchId: string;
  date: string;
}

export interface BranchAnalyticsState {
  dailySales: DailySales[];
  topProducts: TopProduct[];
  topCashiers: TopCashier[];
  categorySales: CategorySales[];
  todayOverview: TodayOverview | null;
  paymentBreakdown: PaymentBreakdown[];
  loading: boolean;
  error: string | null;
}
