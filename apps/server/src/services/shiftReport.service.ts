import mongoose from "mongoose";

import ShiftReport from "../models/shiftReport.model.js";
import Branch from "../models/branch.model.js";
import Order from "../models/order.model.js";
import Refund from "../models/refund.model.js";

import type { IUser } from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import { Product } from "../models/product.model.js";

import type {
  PaymentSummaryDto,
  RecentOrderDto,
  ShiftReportResponseDto,
  ShiftReportSummaryDto,
  StartShiftPayload,
  TopSellingProductDto,
} from "../types/shiftReport.types.js";

import { PaymentType } from "../enums/paymentType.enums.js";

import {
  mapShiftReportSummaryToResponse,
  mapShiftReportToResponse,
  type ShiftReportMapperInput,
} from "../mappers/shiftReport.mapper.js";

import type { RefundMapperInput } from "../mappers/refund.mapper.js";
import { ShiftStatus } from "../enums/shiftStatus.enums.js";

// ======================================================
// HELPERS
// ======================================================

const getRecentOrders = (orders: any[]): RecentOrderDto[] => {
  return orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((order) => ({
      id: order._id.toString(),
      totalAmount: order.totalAmount,
      paymentType: order.paymentType,
      status: order.status,
      createdAt: order.createdAt ?? null,
    }));
};

const getTopSellingProducts = async (orders: any[]): Promise<TopSellingProductDto[]> => {
  const productMap = new Map<
    string,
    {
      quantitySold: number;
    }
  >();

  // Calculate total quantity sold per product
  for (const order of orders) {
    for (const item of order.items) {
      const productId = item.product.toString();

      const existing = productMap.get(productId);

      if (existing) {
        existing.quantitySold += item.quantity;
      } else {
        productMap.set(productId, {
          quantitySold: item.quantity,
        });
      }
    }
  }

  // Top 3 products by quantity sold
  const sortedProducts = [...productMap.entries()]
    .sort((a, b) => b[1].quantitySold - a[1].quantitySold)
    .slice(0, 4);

  if (sortedProducts.length === 0) {
    return [];
  }

  const productIds = sortedProducts.map(([productId]) => productId);

  const products = await Product.find({
    _id: { $in: productIds },
  }).lean();

  const productLookup = new Map(
    products.map((product) => [product._id.toString(), product])
  );

  const results: TopSellingProductDto[] = [];

  for (const [productId, stats] of sortedProducts) {
    const product = productLookup.get(productId);

    if (!product) continue;

    const topProduct: TopSellingProductDto = {
      id: product._id.toString(),

      name: product.name,

      sku: product.sku,

      sellingPrice: product.sellingPrice,

      quantitySold: stats.quantitySold,
    };

    if (product.image) {
      topProduct.image = product.image;
    }

    results.push(topProduct);
  }

  return results;
};

const getPaymentSummaries = (orders: any[], totalSales: number): PaymentSummaryDto[] => {
  const grouped = new Map<
    PaymentType,
    {
      totalAmount: number;
      transactionCount: number;
    }
  >();

  for (const order of orders) {
    const paymentType = order.paymentType ?? PaymentType.CASH;

    const existing = grouped.get(paymentType);

    if (existing) {
      existing.totalAmount += order.totalAmount;
      existing.transactionCount += 1;
    } else {
      grouped.set(paymentType, {
        totalAmount: order.totalAmount,
        transactionCount: 1,
      });
    }
  }

  return [...grouped.entries()].map(([type, data]) => ({
    type,
    totalAmount: data.totalAmount,
    transactionCount: data.transactionCount,
    percentage:
      totalSales === 0 ? 0 : Number(((data.totalAmount / totalSales) * 100).toFixed(2)),
  }));
};

// ======================================================
// START SHIFT
// ======================================================

export const startShiftService = async (
  payload: StartShiftPayload,
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const { branchId } = payload;

  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branch = await Branch.findById(branchId);

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  if (currentUser.branch?.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayShift = await ShiftReport.findOne({
    cashier: currentUser._id,
    shiftStart: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  if (todayShift) {
    switch (todayShift.status) {
      case ShiftStatus.ACTIVE:
        throw new ApiError({
          statusCode: 400,
          message: "Shift already active",
        });

      case ShiftStatus.PAUSED:
        throw new ApiError({
          statusCode: 400,
          message: "Resume existing shift",
        });

      case ShiftStatus.CLOSED:
        throw new ApiError({
          statusCode: 400,
          message: "Shift already completed today",
        });
    }
  }

  const shift = await ShiftReport.create({
    shiftStart: new Date(),
    cashier: currentUser._id,
    branch: branch._id,

    status: ShiftStatus.ACTIVE,

    totalSales: 0,
    totalRefunds: 0,
    netSales: 0,
    totalOrders: 0,

    refunds: [],
    breaks: [],
  });

  const populatedShift = await ShiftReport.findById(shift._id)
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!populatedShift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  return mapShiftReportToResponse(
    populatedShift.toObject() as unknown as ShiftReportMapperInput
  );
};

// ======================================================
// PAUSE SHIFT
// ======================================================
export const pauseShiftService = async (
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const shift = await ShiftReport.findOne({
    cashier: currentUser._id,
    status: ShiftStatus.ACTIVE,
  });

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "No active shift found",
    });
  }

  if (shift.status === ShiftStatus.PAUSED) {
    throw new ApiError({
      statusCode: 400,
      message: "Shift already paused",
    });
  }

  shift.status = ShiftStatus.PAUSED;

  shift.breaks.push({
    pauseAt: new Date(),
  });

  await shift.save();

  const populatedShift = await ShiftReport.findById(shift._id)
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!populatedShift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  return mapShiftReportToResponse(
    populatedShift.toObject() as unknown as ShiftReportMapperInput
  );
};

// ======================================================
export const resumeShiftService = async (
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const shift = await ShiftReport.findOne({
    cashier: currentUser._id,
    status: ShiftStatus.PAUSED,
  });

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "No paused shift found",
    });
  }

  const latestBreak = shift.breaks[shift.breaks.length - 1];

  if (!latestBreak) {
    throw new ApiError({
      statusCode: 400,
      message: "No break found",
    });
  }

  if (latestBreak && !latestBreak.resumeAt) {
    latestBreak.resumeAt = new Date();
  }

  if (shift.status === ShiftStatus.ACTIVE) {
    throw new ApiError({
      statusCode: 400,
      message: "Shift already active",
    });
  }

  shift.status = ShiftStatus.ACTIVE;

  await shift.save();

  const populatedShift = await ShiftReport.findById(shift._id)
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!populatedShift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  return mapShiftReportToResponse(
    populatedShift.toObject() as unknown as ShiftReportMapperInput
  );
};

// ======================================================
// END SHIFT
// ======================================================

export const endShiftService = async (
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const shift = await ShiftReport.findOne({
    cashier: currentUser._id,
    status: {
      $in: [ShiftStatus.ACTIVE, ShiftStatus.PAUSED],
    },
  });

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "No active shift found",
    });
  }

  if (shift.status === ShiftStatus.PAUSED) {
    throw new ApiError({
      statusCode: 400,
      message: "Please resume the shift before ending it",
    });
  }

  const shiftEnd = new Date();

  shift.status = ShiftStatus.CLOSED;

  const orders = await Order.find({
    cashier: currentUser._id,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: shiftEnd,
    },
  });

  const refunds = await Refund.find({
    cashier: currentUser._id,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: shiftEnd,
    },
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName");

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const totalRefunds = refunds.reduce((sum, refund) => sum + refund.amount, 0);

  const netSales = totalSales - totalRefunds;

  shift.shiftEnd = shiftEnd;
  shift.totalSales = totalSales;
  shift.totalRefunds = totalRefunds;
  shift.netSales = netSales;
  shift.totalOrders = orders.length;

  shift.refunds = refunds.map((refund) => refund._id as mongoose.Types.ObjectId);

  await shift.save();

  await Refund.updateMany(
    {
      _id: {
        $in: refunds.map((refund) => refund._id),
      },
    },
    {
      shiftReport: shift._id,
    }
  );

  const recentOrders = getRecentOrders(orders);

  const topSellingProducts = await getTopSellingProducts(orders);

  const paymentSummaries = getPaymentSummaries(orders, totalSales);

  const populatedShift = await ShiftReport.findById(shift._id)
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!populatedShift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  return mapShiftReportToResponse({
    ...(populatedShift.toObject() as unknown as ShiftReportMapperInput),

    refunds: populatedShift.refunds as unknown as RefundMapperInput[],

    recentOrders,

    topSellingProducts,

    paymentSummaries,
  });
};

// ======================================================
// GET CURRENT SHIFT PROGRESS
// ======================================================

export const getCurrentShiftProgressService = async (
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const shift = await ShiftReport.findOne({
    cashier: currentUser._id,
    status: {
      $in: [ShiftStatus.ACTIVE, ShiftStatus.PAUSED],
    },
  })
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "No active shift found",
    });
  }

  const now = new Date();

  const orders = await Order.find({
    cashier: currentUser._id,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: now,
    },
  });

  const refunds = await Refund.find({
    cashier: currentUser._id,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: now,
    },
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName");

  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const totalRefunds = refunds.reduce((sum, refund) => sum + refund.amount, 0);

  const recentOrders = getRecentOrders(orders);

  const topSellingProducts = await getTopSellingProducts(orders);

  const paymentSummaries = getPaymentSummaries(orders, totalSales);

  return mapShiftReportToResponse({
    ...(shift.toObject() as unknown as ShiftReportMapperInput),

    totalSales,

    totalRefunds,

    netSales: totalSales - totalRefunds,

    totalOrders: orders.length,

    refunds: refunds as unknown as RefundMapperInput[],

    recentOrders,

    topSellingProducts,

    paymentSummaries,
  });
};

// ======================================================
// GET SHIFT REPORT BY ID
// ======================================================

export const getShiftReportByIdService = async (
  shiftReportId: string,
  currentUser: IUser
): Promise<ShiftReportResponseDto> => {
  const shift = await ShiftReport.findById(shiftReportId)
    .populate("cashier", "fullName")
    .populate({
      path: "refunds",
      populate: [
        {
          path: "cashier",
          select: "fullName",
        },
        {
          path: "branch",
        },
        {
          path: "order",
        },
      ],
    });

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  if (currentUser.branch && shift.branch.toString() !== currentUser.branch.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  const shiftEnd = shift.shiftEnd ?? new Date();

  const orders = await Order.find({
    cashier: shift.cashier,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: shiftEnd,
    },
  });

  const recentOrders = getRecentOrders(orders);

  const topSellingProducts = await getTopSellingProducts(orders);

  const paymentSummaries = getPaymentSummaries(orders, shift.totalSales);

  return mapShiftReportToResponse({
    ...(shift.toObject() as unknown as ShiftReportMapperInput),

    refunds: shift.refunds as unknown as RefundMapperInput[],

    recentOrders,

    topSellingProducts,

    paymentSummaries,
  });
};

// ======================================================
// GET ALL SHIFT REPORTS
// ======================================================

export const getAllShiftReportsService = async (
  currentUser: IUser
): Promise<ShiftReportSummaryDto[]> => {
  const filter: Record<string, unknown> = {};

  if (currentUser.branch) {
    filter.branch = currentUser.branch;
  }

  const shifts = await ShiftReport.find(filter)
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  return shifts.map((shift) =>
    mapShiftReportSummaryToResponse(shift.toObject() as unknown as ShiftReportMapperInput)
  );
};

// ======================================================
// GET SHIFT REPORTS BY CASHIER
// ======================================================

export const getShiftReportsByCashierService = async (
  cashierId: string,
  currentUser: IUser
): Promise<ShiftReportSummaryDto[]> => {
  const shifts = await ShiftReport.find({
    cashier: cashierId,
  })
    .populate("cashier", "fullName")
    .populate("refunds")
    .sort({
      shiftStart: -1,
    });

  if (
    currentUser.branch &&
    shifts.some((shift) => shift.branch.toString() !== currentUser.branch?.toString())
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  return shifts.map((shift) =>
    mapShiftReportSummaryToResponse(shift.toObject() as unknown as ShiftReportMapperInput)
  );
};

// ======================================================
// GET SHIFT REPORTS BY BRANCH
// ======================================================

export const getShiftReportsByBranchService = async (
  branchId: string,
  currentUser: IUser
): Promise<ShiftReportSummaryDto[]> => {
  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  const shifts = await ShiftReport.find({
    branch: branchId,
  })
    .populate("cashier", "fullName")
    .populate("refunds")
    .sort({
      shiftStart: -1,
    });

  return shifts.map((shift) =>
    mapShiftReportSummaryToResponse(shift.toObject() as unknown as ShiftReportMapperInput)
  );
};

// ======================================================
// GET SHIFT REPORT BY CASHIER & DATE
// ======================================================

export const getShiftReportByCashierAndDateService = async (
  cashierId: string,
  date: Date,
  currentUser: IUser
): Promise<ShiftReportSummaryDto> => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const shift = await ShiftReport.findOne({
    cashier: cashierId,
    shiftStart: {
      $gte: start,
      $lte: end,
    },
  })
    .populate("cashier", "fullName")
    .populate("refunds");

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  if (currentUser.branch && shift.branch.toString() !== currentUser.branch.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  const shiftEnd = shift.shiftEnd ?? new Date();

  const orders = await Order.find({
    cashier: shift.cashier,
    createdAt: {
      $gte: shift.shiftStart,
      $lte: shiftEnd,
    },
  });

  return mapShiftReportToResponse({
    ...(shift.toObject() as unknown as ShiftReportMapperInput),

    recentOrders: getRecentOrders(orders),

    topSellingProducts: await getTopSellingProducts(orders),

    paymentSummaries: getPaymentSummaries(orders, shift.totalSales),
  });
};

// ======================================================
// DELETE SHIFT REPORT
// ======================================================

export const deleteShiftReportService = async (
  shiftReportId: string,
  currentUser: IUser
): Promise<void> => {
  const shift = await ShiftReport.findById(shiftReportId);

  if (!shift) {
    throw new ApiError({
      statusCode: 404,
      message: "Shift report not found",
    });
  }

  if (currentUser.branch && shift.branch.toString() !== currentUser.branch.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  await ShiftReport.findByIdAndDelete(shiftReportId);
};
