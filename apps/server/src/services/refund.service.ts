import mongoose from "mongoose";

import Refund from "../models/refund.model.js";
import Order from "../models/order.model.js";
import Branch from "../models/branch.model.js";
import User from "../models/user.model.js";

import type { IUser } from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";

import { OrderStatus } from "../enums/orderStatus.enums.js";

import type { CreateRefundPayload, RefundResponseDto } from "../types/refund.types.js";

import {
  mapRefundToResponse,
  mapRefundsToResponse,
  type RefundMapperInput,
} from "../mappers/refund.mapper.js";

// ============== CREATE REFUND SERVICE ==================
export const createRefundService = async (
  payload: CreateRefundPayload,
  currentUser: IUser
): Promise<RefundResponseDto> => {
  const { orderId, branchId, reason } = payload;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid order ID",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError({
      statusCode: 404,
      message: "Order not found",
    });
  }

  if (order.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 400,
      message: "Order does not belong to selected branch",
    });
  }

  const branch = await Branch.findById(branchId);

  if (!branch) {
    throw new ApiError({
      statusCode: 404,
      message: "Branch not found",
    });
  }

  if (order.status === OrderStatus.REFUNDED) {
    throw new ApiError({
      statusCode: 400,
      message: "Order already refunded",
    });
  }

  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  const refund = await Refund.create({
    order: order._id,
    cashier: currentUser._id,
    branch: branch._id,
    reason,
    amount: order.totalAmount,
    paymentType: order.paymentType,
  });

  order.status = OrderStatus.REFUNDED;
  await order.save();

  const populatedRefund = await Refund.findById(refund._id)
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName");

  if (!populatedRefund) {
    throw new ApiError({
      statusCode: 404,
      message: "Refund not found after creation",
    });
  }

  return mapRefundToResponse(populatedRefund as unknown as RefundMapperInput);
};

// ============== GET ALL REFUND SERVICE ==================
export const getAllRefundsService = async (
  currentUser: IUser
): Promise<RefundResponseDto[]> => {
  const filter: Record<string, unknown> = {};

  if (currentUser.branch) {
    filter.branch = currentUser.branch;
  }

  const refunds = await Refund.find(filter)
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  return mapRefundsToResponse(refunds as unknown as RefundMapperInput[]);
};

// ============== GET REFUND BY CASHIER SERVICE ==================
export const getRefundsByCashierService = async (
  cashierId: string,
  currentUser: IUser
): Promise<RefundResponseDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(cashierId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid cashier ID",
    });
  }

  const cashier = await User.findById(cashierId);

  if (!cashier) {
    throw new ApiError({
      statusCode: 404,
      message: "Cashier not found",
    });
  }

  if (
    currentUser.branch &&
    cashier.branch?.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  const refunds = await Refund.find({
    cashier: cashierId,
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  return mapRefundsToResponse(refunds as unknown as RefundMapperInput[]);
};

// ============== GET REFUND BY BRANCH SERVICE ==================
export const getRefundsByBranchService = async (
  branchId: string,
  currentUser: IUser
): Promise<RefundResponseDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  if (currentUser.branch && currentUser.branch.toString() !== branchId) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied for this branch",
    });
  }

  const refunds = await Refund.find({
    branch: branchId,
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  return mapRefundsToResponse(refunds as unknown as RefundMapperInput[]);
};

// ============== GET REFUND BY SHIFT REPORT SERVICE ==================
export const getRefundsByShiftReportService = async (
  shiftReportId: string,
  currentUser: IUser
): Promise<RefundResponseDto[]> => {
  const refunds = await Refund.find({
    shiftReport: shiftReportId,
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  if (
    currentUser.branch &&
    refunds.some((refund) => refund.branch.toString() !== currentUser.branch?.toString())
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  return mapRefundsToResponse(refunds as unknown as RefundMapperInput[]);
};

// ============== GET REFUND BY CASHIER AND DATE RANGE SERVICE ==================
export const getRefundsByCashierAndDateRangeService = async (
  cashierId: string,
  from: Date,
  to: Date,
  currentUser: IUser
): Promise<RefundResponseDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(cashierId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid cashier ID",
    });
  }

  const cashier = await User.findById(cashierId);

  if (!cashier) {
    throw new ApiError({
      statusCode: 404,
      message: "Cashier not found",
    });
  }

  if (
    currentUser.branch &&
    cashier.branch?.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }
  const refunds = await Refund.find({
    cashier: cashierId,
    createdAt: {
      $gte: from,
      $lte: to,
    },
  })
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName")
    .sort({ createdAt: -1 });

  return mapRefundsToResponse(refunds as unknown as RefundMapperInput[]);
};

// ============== GET REFUND BY ID SERVICE ==================
export const getRefundByIdService = async (
  refundId: string,
  currentUser: IUser
): Promise<RefundResponseDto> => {
  const refund = await Refund.findById(refundId)
    .populate("order")
    .populate("branch")
    .populate("cashier", "fullName");

  if (!refund) {
    throw new ApiError({
      statusCode: 404,
      message: "Refund not found",
    });
  }

  if (
    currentUser.branch &&
    refund.branch &&
    typeof refund.branch !== "string" &&
    refund.branch._id.toString() !== currentUser.branch.toString()
  ) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  return mapRefundToResponse(refund as unknown as RefundMapperInput);
};

// ============== DELETE REFUND SERVICE ==================
export const deleteRefundService = async (
  refundId: string,
  currentUser: IUser
): Promise<void> => {
  const refund = await Refund.findById(refundId);

  if (!refund) {
    throw new ApiError({
      statusCode: 404,
      message: "Refund not found",
    });
  }

  if (currentUser.branch && refund.branch.toString() !== currentUser.branch.toString()) {
    throw new ApiError({
      statusCode: 403,
      message: "Access denied",
    });
  }

  await Refund.findByIdAndDelete(refundId);
};
