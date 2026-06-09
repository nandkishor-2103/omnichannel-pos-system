export interface CreateRefundPayload {
  orderId: string;
  branchId: string;
  reason: string;
  refundAmount: number;
  refundMethod: string;
}

export interface RefundItem {
  productId: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface RefundResponseDto {
  id: string;

  orderId: string;

  reason: string;

  refundAmount: number;

  cashierName: string;

  shiftReportId: string | null;

  branchId: string;

  refundMethod: string;

  items: RefundItem[];

  createdAt: Date | null;
}
