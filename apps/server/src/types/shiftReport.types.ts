import type { PaymentType } from "../enums/paymentType.enums.js";

import type { RefundResponseDto } from "./refund.types.js";

export interface PaymentSummaryDto {
  type: PaymentType;

  totalAmount: number;

  transactionCount: number;

  percentage: number;
}

export interface StartShiftPayload {
  branchId: string;
}

export interface ShiftBreakDto {
  pauseAt: Date;
  resumeAt: Date | null;
}

export interface RecentOrderDto {
  id: string;
  totalAmount: number;
  paymentType: string;
  status: string;
  createdAt: Date | null;
}

export interface TopSellingProductDto {
  id: string;

  name: string;

  sku: string;

  image?: string;

  sellingPrice: number;

  quantitySold: number;
}

export interface ShiftReportSummaryDto {
  id: string;

  shiftStart: Date;

  shiftEnd: Date | null;

  status: "ACTIVE" | "PAUSED" | "CLOSED";

  breaks: ShiftBreakDto[];

  totalSales: number;

  totalRefunds: number;

  netSales: number;

  totalOrders: number;

  cashierId: string;

  cashierName: string;

  branchId: string;
}

export interface ShiftReportResponseDto extends ShiftReportSummaryDto {
  recentOrders: RecentOrderDto[];

  topSellingProducts: TopSellingProductDto[];

  refunds: RefundResponseDto[];

  paymentSummaries: PaymentSummaryDto[];
}
