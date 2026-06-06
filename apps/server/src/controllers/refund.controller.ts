import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import type { IUser } from "../models/user.model.js";

import {
  createRefundService,
  getAllRefundsService,
  getRefundsByCashierService,
  getRefundsByBranchService,
  getRefundsByShiftReportService,
  getRefundsByCashierAndDateRangeService,
  getRefundByIdService,
  deleteRefundService,
} from "../services/refund.service.js";

// ============== CREATE REFUND CONTROLLER ==================
export const createRefundController = asyncHandler(
  async (req: Request, res: Response) => {
    const refund = await createRefundService(req.body, req.user as IUser);

    res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Refund created successfully",
        payload: {
          refund,
        },
      })
    );
  }
);

// ============== GET ALL REFUND CONTROLLER ==================
export const getAllRefundsController = asyncHandler(
  async (req: Request, res: Response) => {
    const refunds = await getAllRefundsService(req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Refunds fetched successfully",
        payload: {
          refunds,
        },
      })
    );
  }
);

// ============== GET REFUND BY CASHIER CONTROLLER ==================
export const getRefundsByCashierController = asyncHandler(
  async (req: Request, res: Response) => {
    const refunds = await getRefundsByCashierService(
      req.params.cashierId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Cashier refunds fetched successfully",
        payload: {
          refunds,
        },
      })
    );
  }
);

// ============== GET REFUND BY BRANCH CONTROLLER ==================
export const getRefundsByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const refunds = await getRefundsByBranchService(
      req.params.branchId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch refunds fetched successfully",
        payload: {
          refunds,
        },
      })
    );
  }
);

// ============== GET REFUND BY SHIFT REPORT CONTROLLER ==================
export const getRefundsByShiftReportController = asyncHandler(
  async (req: Request, res: Response) => {
    const refunds = await getRefundsByShiftReportService(
      req.params.shiftReportId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Shift report refunds fetched successfully",
        payload: {
          refunds,
        },
      })
    );
  }
);

// ============== GET REFUND BY CASHIER AND DATE RANGE CONTROLLER ==================
export const getRefundsByCashierAndDateRangeController = asyncHandler(
  async (req: Request, res: Response) => {
    const refunds = await getRefundsByCashierAndDateRangeService(
      req.params.cashierId as string,
      new Date(req.query.from as string),
      new Date(req.query.to as string),
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Refunds fetched successfully",
        payload: {
          refunds,
        },
      })
    );
  }
);

// ============== GET REFUND BY ID CONTROLLER ==================
export const getRefundByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const refund = await getRefundByIdService(req.params.id as string, req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Refund fetched successfully",
        payload: {
          refund,
        },
      })
    );
  }
);

// ============== DELETE REFUND CONTROLLER ==================
export const deleteRefundController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteRefundService(req.params.id as string, req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Refund deleted successfully",
      })
    );
  }
);
