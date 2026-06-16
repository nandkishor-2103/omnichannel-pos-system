import type { Request, Response } from "express";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  getCurrentStoreSubscriptionService,
  getStoreSubscriptionHistoryService,
} from "../services/storeSubscription.service.js";

// ==================================================
// GET CURRENT SUBSCRIPTION
// ==================================================
export const getCurrentStoreSubscriptionController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const subscription = await getCurrentStoreSubscriptionService(storeId!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Current subscription fetched successfully",
        payload: {
          subscription,
        },
      })
    );
  }
);

// ==================================================
// GET SUBSCRIPTION HISTORY
// ==================================================
export const getStoreSubscriptionHistoryController = asyncHandler(async (req, res) => {
  const storeId = req.user?.store?.toString();

  const subscriptions = await getStoreSubscriptionHistoryService(storeId as string);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Subscription history fetched successfully",
      payload: {
        subscriptions,
      },
    })
  );
});
