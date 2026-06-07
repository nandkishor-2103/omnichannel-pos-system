import type {
  PaymentSummaryDto,
  ShiftReportResponseDto,
  RecentOrderDto,
  TopSellingProductDto,
  ShiftReportSummaryDto,
} from "../types/shiftReport.types.js";

import { mapRefundToResponse } from "./refund.mapper.js";

interface PopulatedEntity {
  _id: {
    toString(): string;
  };
}

interface PopulatedCashier extends PopulatedEntity {
  fullName: string;
}

interface PopulatedRefund extends PopulatedEntity {
  order: unknown;
  reason: string;
  amount: number;
  cashier: unknown;
  branch: unknown;
  shiftReport?: unknown;
  paymentType: string;
  createdAt?: Date;
}

export interface ShiftReportMapperInput {
  _id: {
    toString(): string;
  };

  shiftStart: Date;

  shiftEnd?: Date | null;

  totalSales: number;

  totalRefunds: number;

  netSales: number;

  totalOrders: number;

  cashier: string | PopulatedCashier;

  branch: string | PopulatedEntity;

  recentOrders?: RecentOrderDto[];

  topSellingProducts?: TopSellingProductDto[];

  refunds: PopulatedRefund[] | string[];

  paymentSummaries?: PaymentSummaryDto[];
}

const getId = (value: string | PopulatedEntity): string => {
  return typeof value === "string" ? value : value._id.toString();
};

export const mapShiftReportToResponse = (
  shiftReport: ShiftReportMapperInput
): ShiftReportResponseDto => {
  return {
    id: shiftReport._id.toString(),

    shiftStart: shiftReport.shiftStart,

    shiftEnd: shiftReport.shiftEnd ?? null,

    totalSales: shiftReport.totalSales,

    totalRefunds: shiftReport.totalRefunds,

    netSales: shiftReport.netSales,

    totalOrders: shiftReport.totalOrders,

    cashierId: getId(shiftReport.cashier),

    cashierName:
      typeof shiftReport.cashier === "string" ? "" : shiftReport.cashier.fullName,

    branchId: getId(shiftReport.branch),

    recentOrders: shiftReport.recentOrders ?? [],

    topSellingProducts: shiftReport.topSellingProducts ?? [],

    refunds:
      shiftReport.refunds.length > 0 && typeof shiftReport.refunds[0] !== "string"
        ? (shiftReport.refunds as PopulatedRefund[]).map((refund) =>
            mapRefundToResponse(refund as never)
          )
        : [],

    paymentSummaries: shiftReport.paymentSummaries ?? [],
  };
};

export const mapShiftReportsToResponse = (
  shiftReports: ShiftReportMapperInput[]
): ShiftReportResponseDto[] => {
  return shiftReports.map(mapShiftReportToResponse);
};

export const mapShiftReportSummaryToResponse = (
  shiftReport: ShiftReportMapperInput
): ShiftReportSummaryDto => {
  return {
    id: shiftReport._id.toString(),
    shiftStart: shiftReport.shiftStart,
    shiftEnd: shiftReport.shiftEnd ?? null,
    totalSales: shiftReport.totalSales,
    totalRefunds: shiftReport.totalRefunds,
    netSales: shiftReport.netSales,
    totalOrders: shiftReport.totalOrders,
    cashierId: getId(shiftReport.cashier),
    cashierName:
      typeof shiftReport.cashier === "string" ? "" : shiftReport.cashier.fullName,
    branchId: getId(shiftReport.branch),
  };
};
