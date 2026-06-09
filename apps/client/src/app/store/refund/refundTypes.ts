export interface RefundItem {
  productId: string;
  quantity: number;
  amount: number;
}

export interface Refund {
  id: string;

  orderId: string;

  reason: string;

  refundAmount: number;

  cashierName: string;

  shiftReportId: string | null;

  branchId: string;

  refundMethod: string;

  items: RefundItem[];

  createdAt: string;
}

export interface CreateRefundPayload {
  orderId: string;
  branchId: string;
  reason: string;
  refundAmount: number;
  refundMethod: string;
}

export interface RefundResponse {
  statusCode: number;
  success: boolean;
  message: string;

  payload: {
    refund: Refund;
  };
}

export interface RefundsResponse {
  refunds: Refund[];
  message?: string;
}

export interface RefundDateRangePayload {
  cashierId: string;
  from: string;
  to: string;
}

export interface RefundState {
  refunds: Refund[];
  refundsByCashier: Refund[];
  refundsByBranch: Refund[];
  refundsByShift: Refund[];
  refundsByDateRange: Refund[];
  selectedRefund: Refund | null;
  loading: boolean;
  error: string | null;
}
