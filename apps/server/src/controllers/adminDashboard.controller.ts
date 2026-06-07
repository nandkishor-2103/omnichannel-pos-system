import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  getDashboardSummaryService,
  getStoreRegistrationStatsService,
  getStoreStatusDistributionService,
} from "../services/adminDashboard.service.js";

// =========================================
// Dashboard Summary
// =========================================

export const getDashboardSummaryController = asyncHandler(
  async (req: Request, res: Response) => {
    const summary = await getDashboardSummaryService();

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Dashboard summary fetched successfully",
        payload: {
          summary,
        },
      })
    );
  }
);

// =========================================
// Store Registrations (Last 7 Days)
// =========================================

export const getStoreRegistrationStatsController = asyncHandler(
  async (req: Request, res: Response) => {
    const registrations = await getStoreRegistrationStatsService();

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store registration stats fetched successfully",
        payload: {
          registrations,
        },
      })
    );
  }
);

// =========================================
// Store Status Distribution
// =========================================

export const getStoreStatusDistributionController = asyncHandler(
  async (req: Request, res: Response) => {
    const distribution = await getStoreStatusDistributionService();

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store status distribution fetched successfully",
        payload: {
          distribution,
        },
      })
    );
  }
);
