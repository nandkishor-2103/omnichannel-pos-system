import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getStoreOverviewService,
  getSalesTrendsService,
  getMonthlySalesGraphService,
  getDailySalesGraphService,
  getSalesByCategoryService,
  getSalesByPaymentMethodService,
  getSalesByBranchService,
  getPaymentBreakdownService,
  getBranchPerformanceService,
  getStoreAlertsService,
  getTodaySalesByBranchService,
} from "../services/storeAnalytics.service.js";

export const getStoreOverviewController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getStoreOverviewService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store overview fetched successfully",
        payload: {
          overview: data,
        },
      })
    );
  }
);

export const getSalesTrendsController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getSalesTrendsService(
      storeId,
      String(req.query.period || "DAILY") as "DAILY" | "WEEKLY" | "MONTHLY"
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Sales trends fetched successfully",
        payload: {
          trends: data,
        },
      })
    );
  }
);

export const getMonthlySalesController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getMonthlySalesGraphService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Monthly sales fetched successfully",
        payload: {
          monthlySales: data,
        },
      })
    );
  }
);

export const getDailySalesController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getDailySalesGraphService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Daily sales fetched successfully",
        payload: {
          dailySales: data,
        },
      })
    );
  }
);

export const getSalesByCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getSalesByCategoryService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Category sales fetched successfully",
        payload: {
          categorySales: data,
        },
      })
    );
  }
);

export const getSalesByPaymentMethodController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getSalesByPaymentMethodService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Payment method sales fetched successfully",
        payload: {
          paymentMethods: data,
        },
      })
    );
  }
);

export const getSalesByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getSalesByBranchService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch sales fetched successfully",
        payload: {
          branchSales: data,
        },
      })
    );
  }
);

export const getPaymentBreakdownController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getPaymentBreakdownService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Payment breakdown fetched successfully",
        payload: {
          payments: data,
        },
      })
    );
  }
);

export const getBranchPerformanceController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getBranchPerformanceService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch performance fetched successfully",
        payload: {
          performance: data,
        },
      })
    );
  }
);

export const getStoreAlertsController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);
    const data = await getStoreAlertsService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store alerts fetched successfully",
        payload: {
          alerts: data,
        },
      })
    );
  }
);

export const getTodaySalesByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = String(req.params.storeId);

    const data = await getTodaySalesByBranchService(storeId);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Today's sales by branch fetched successfully",
        payload: {
          sales: data,
        },
      })
    );
  }
);
