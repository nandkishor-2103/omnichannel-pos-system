export interface RefundItem {
  productId: string;
  quantity: number;
  amount: number;
}

export interface Refund {
  _id: string;
  orderId: string;
  cashierId: string;
  branchId: string;
  shiftReportId?: string;
  reason: string;
  refundAmount: number;
  items?: RefundItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRefundPayload {
  orderId: string;
  reason: string;
  refundAmount: number;
  items?: RefundItem[];
}

export interface RefundResponse {
  refund: Refund;
  message?: string;
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
