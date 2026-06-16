import type { StoreSubscriptionDocument } from "../models/storeSubscription.model.js";

import type { StoreSubscriptionResponseDto } from "../types/storeSubscription.dto.js";

export const mapStoreSubscriptionToResponseDto = (
  subscription: StoreSubscriptionDocument
): StoreSubscriptionResponseDto => {
  return {
    _id: subscription._id.toString(),

    store: subscription.store.toString(),

    subscriptionPlan: subscription.subscriptionPlan.toString(),

    startDate: subscription.startDate,

    endDate: subscription.endDate,

    status: subscription.status,

    ...(subscription.createdAt && {
      createdAt: subscription.createdAt,
    }),

    ...(subscription.updatedAt && {
      updatedAt: subscription.updatedAt,
    }),
  };
};
