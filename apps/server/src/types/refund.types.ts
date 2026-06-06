export interface CreateRefundPayload {
  orderId: string;
  branchId: string;
  reason: string;
}

export interface RefundResponseDto {
  id: string;

  orderId: string;

  reason: string;

  amount: number;

  cashierName: string;

  shiftReportId: string | null;

  branchId: string;

  paymentType: string;

  createdAt: Date | null;
}
