import SubscriptionPlan from "../models/subscriptionPlan.model.js";

import ApiError from "../utils/ApiError.js";

import type {
  CreateSubscriptionPlanDto,
  UpdateSubscriptionPlanDto,
} from "../types/subscriptionPlan.types.js";

// ================= CREATE =================

export const createSubscriptionPlanService = async (
  planData: CreateSubscriptionPlanDto
) => {
  const existingPlan = await SubscriptionPlan.findOne({
    name: planData.name,
  });

  if (existingPlan) {
    throw new ApiError({
      statusCode: 409,
      message: "Subscription plan already exists",
    });
  }

  const plan = await SubscriptionPlan.create(planData);

  return plan;
};

// ================= GET ALL =================

export const getAllSubscriptionPlansService = async () => {
  const plans = await SubscriptionPlan.find().sort({
    createdAt: -1,
  });

  return plans;
};

// ================= GET BY ID =================

export const getSubscriptionPlanByIdService = async (planId: string) => {
  const plan = await SubscriptionPlan.findById(planId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  return plan;
};

// ================= UPDATE =================

export const updateSubscriptionPlanService = async (
  planId: string,
  planData: UpdateSubscriptionPlanDto
) => {
  const plan = await SubscriptionPlan.findById(planId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  if (planData.name && planData.name !== plan.name) {
    const existingPlan = await SubscriptionPlan.findOne({
      name: planData.name,
      _id: { $ne: planId },
    });

    if (existingPlan) {
      throw new ApiError({
        statusCode: 409,
        message: "Subscription plan name already exists",
      });
    }
  }

  Object.assign(plan, planData);

  await plan.save();

  return plan;
};

// ================= DELETE =================

export const deleteSubscriptionPlanService = async (planId: string) => {
  const plan = await SubscriptionPlan.findById(planId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  await plan.deleteOne();

  return;
};

// ================= ACTIVATE =================

export const activateSubscriptionPlanService = async (planId: string) => {
  const plan = await SubscriptionPlan.findById(planId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  plan.status = "ACTIVE";

  await plan.save();

  return plan;
};

// ================= DEACTIVATE =================

export const deactivateSubscriptionPlanService = async (planId: string) => {
  const plan = await SubscriptionPlan.findById(planId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  plan.status = "INACTIVE";

  await plan.save();

  return plan;
};
