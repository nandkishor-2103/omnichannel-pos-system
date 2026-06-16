import { SubscriptionStatus } from "../enums/subscriptionStatus.enum.js";
import StoreSubscription from "../models/storeSubscription.model.js";

import ApiError from "../utils/ApiError.js";

// ==================================================
// GET CURRENT SUBSCRIPTION
// ==================================================
export const getCurrentStoreSubscriptionService = async (
  storeId: string
) => {
  const subscription = await StoreSubscription.findOne({
    store: storeId,
    status: SubscriptionStatus.ACTIVE,
  }).populate("subscriptionPlan", "name");

  if (!subscription) {
    throw new ApiError({
      statusCode: 404,
      message: "No active subscription found",
    });
  }

  return subscription;
};

// ==================================================
// GET SUBSCRIPTION HISTORY
// ==================================================
export const getStoreSubscriptionHistoryService = async (
  storeId: string
) => {
  return StoreSubscription.find({
    store: storeId,
  })
    .populate("subscriptionPlan", "name")
    .sort({
      createdAt: -1,
    });
};
