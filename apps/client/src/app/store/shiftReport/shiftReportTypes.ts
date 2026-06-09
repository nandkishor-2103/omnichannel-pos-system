export interface ShiftBreak {
  pauseAt: string;
  resumeAt: string | null;
}

export type ShiftStatus = "ACTIVE" | "PAUSED" | "CLOSED";

export interface RecentOrder {
  id: string;
  totalAmount: number;
  paymentType: string;
  status: string;
  createdAt: string;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  sku: string;
  quantitySold: number;
  image?: string;
  sellingPrice: number;
}

export interface Refund {
  id: string;
  orderId: string;
  reason: string;
  refundAmount: number;
  cashierName: string;
  shiftReportId: string;
  branchId: string;
  refundMethod: string;
  items: unknown[];
  createdAt: string;
}

export interface PaymentSummary {
  type: string;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}

export interface ShiftReport {
  id: string;

  cashierId: string;
  cashierName: string;

  branchId: string;

  shiftStart: string;
  shiftEnd: string | null;

  status: ShiftStatus;

  breaks: ShiftBreak[];

  totalOrders: number;
  totalSales: number;
  totalRefunds: number;
  netSales: number;

  recentOrders: RecentOrder[];
  topSellingProducts: TopSellingProduct[];
  refunds: Refund[];
  paymentSummaries: PaymentSummary[];
}

export interface ShiftReportResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;

  payload: {
    shiftReport: ShiftReport;
  };
}

export interface ShiftReportsResponse {
  statusCode?: number;
  success?: boolean;
  message?: string;

  payload: {
    shiftReports: ShiftReport[];
  };
}

export interface ShiftReportByDatePayload {
  cashierId: string;
  date: string;
}

export interface ShiftReportState {
  shifts: ShiftReport[];
  currentShift: ShiftReport | null;
  selectedShift: ShiftReport | null;
  shiftsByCashier: ShiftReport[];
  shiftsByBranch: ShiftReport[];
  loading: boolean;
  error: string | null;
}
