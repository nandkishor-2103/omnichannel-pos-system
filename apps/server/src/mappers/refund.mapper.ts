import type { RefundResponseDto } from "../types/refund.types.js";

interface PopulatedEntity {
  _id: {
    toString(): string;
  };
}

interface PopulatedCashier extends PopulatedEntity {
  fullName: string;
}

export interface RefundMapperInput {
  _id: {
    toString(): string;
  };

  order: string | PopulatedEntity;

  reason: string;

  amount: number;

  cashier: string | PopulatedCashier;

  shiftReport?: string | PopulatedEntity | null;

  branch: string | PopulatedEntity;

  paymentType: string;

  createdAt?: Date;
}

const getId = (value: string | PopulatedEntity): string => {
  return typeof value === "string" ? value : value._id.toString();
};

export const mapRefundToResponse = (refund: RefundMapperInput): RefundResponseDto => {
  return {
    id: refund._id.toString(),

    orderId: getId(refund.order),

    reason: refund.reason,

    refundAmount: refund.amount,

    cashierName:
      typeof refund.cashier === "string" ? refund.cashier : refund.cashier.fullName,

    shiftReportId: refund.shiftReport == null ? null : getId(refund.shiftReport),

    branchId: getId(refund.branch),

    refundMethod: refund.paymentType,

    items: [],

    createdAt: refund.createdAt ?? null,
  };
};

export const mapRefundsToResponse = (
  refunds: RefundMapperInput[]
): RefundResponseDto[] => {
  return refunds.map(mapRefundToResponse);
};
