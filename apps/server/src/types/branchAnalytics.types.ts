import type { PaymentType } from "../enums/paymentType.enums.js";

export interface DailySalesDto {
  date: string;
  totalSales: number;
}

export interface ProductPerformanceDto {
  productId: string;
  productName: string;
  quantitySold: number;
  percentage: number;
}

export interface CashierPerformanceDto {
  cashierId: string;
  cashierName: string;
  totalOrders: number;
  totalRevenue: number;
}

export interface CategorySalesDto {
  categoryId: string;
  categoryName: string;
  totalSales: number;
  quantitySold: number;
}

export interface TodayOverviewDto {
  totalSales: number;
  salesGrowth: number;

  ordersToday: number;
  orderGrowth: number;

  activeCashiers: number;
  cashierGrowth: number;

  lowStockItems: number;
  lowStockGrowth: number;
}

export interface PaymentBreakdownDto {
  type: PaymentType;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}
