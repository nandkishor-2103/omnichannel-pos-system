import type { SubscriptionPlanDocument } from "../models/subscriptionPlan.model.js";

import type { SubscriptionPlanResponseDto } from "../types/subscriptionPlan.types.js";

export const mapSubscriptionPlanToResponseDto = (
  plan: SubscriptionPlanDocument
): SubscriptionPlanResponseDto => {
  return {
    _id: plan._id.toString(),

    name: plan.name,

    ...(plan.description && {
      description: plan.description,
    }),

    price: plan.price,

    billingCycle: plan.billingCycle,

    maxBranches: plan.maxBranches,

    maxUsers: plan.maxUsers,

    maxProducts: plan.maxProducts,

    enableAdvancedReports: plan.enableAdvancedReports,

    enableInventory: plan.enableInventory,

    enableIntegrations: plan.enableIntegrations,

    enableEcommerce: plan.enableEcommerce,

    enableInvoiceBranding: plan.enableInvoiceBranding,

    prioritySupport: plan.prioritySupport,

    enableMultiLocation: plan.enableMultiLocation,

    extraFeatures: plan.extraFeatures,

    status: plan.status,

    ...(plan.createdAt && {
      createdAt: plan.createdAt,
    }),

    ...(plan.updatedAt && {
      updatedAt: plan.updatedAt,
    }),
  };
};
