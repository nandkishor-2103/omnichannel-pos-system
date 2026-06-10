export interface DailySales {
  date: string;
  totalSales: number;
}

export interface TopProduct {
  productId: string;
  productName: string;
  quantitySold: number;
  percentage: number;
}

export interface TopCashier {
  cashierId: string;
  cashierName: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface CategorySales {
  categoryId: string;
  categoryName: string;
  totalSales: number;
}
type PaymentType = "CASH" | "CARD" | "UPI";

export interface PaymentBreakdown {
  type: PaymentType;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}

export interface TodayOverview {
  totalSales: number;
  salesGrowth: number;
  ordersToday: number;
  orderGrowth: number;
  activeCashiers: number;
  cashierGrowth: number;
  lowStockItems: number;
  lowStockGrowth: number;
}

export interface DailySalesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    sales: DailySales[];
  };
}

export interface TopProductsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    products: TopProduct[];
  };
}

export interface TopCashiersResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    cashiers: TopCashier[];
  };
}

export interface CategorySalesResponse {
  categorySales: CategorySales[];
}

export interface TodayOverviewResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    overview: TodayOverview;
  };
}

export interface PaymentBreakdownResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    payments: PaymentBreakdown[];
  };
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
