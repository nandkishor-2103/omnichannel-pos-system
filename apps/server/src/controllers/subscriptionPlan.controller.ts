import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  createSubscriptionPlanService,
  getAllSubscriptionPlansService,
  getSubscriptionPlanByIdService,
  updateSubscriptionPlanService,
  deleteSubscriptionPlanService,
  activateSubscriptionPlanService,
  deactivateSubscriptionPlanService,
} from "../services/subscriptionPlan.service.js";

import { mapSubscriptionPlanToResponseDto } from "../mappers/subscriptionPlan.mapper.js";

// ================= CREATE =================

export const createSubscriptionPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await createSubscriptionPlanService(req.body);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Subscription plan created successfully",
        payload: {
          plan: mapSubscriptionPlanToResponseDto(plan),
        },
      })
    );
  }
);

// ================= GET ALL =================

export const getAllSubscriptionPlansController = asyncHandler(
  async (_req: Request, res: Response) => {
    const plans = await getAllSubscriptionPlansService();

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plans fetched successfully",
        payload: {
          plans: plans.map(mapSubscriptionPlanToResponseDto),
        },
      })
    );
  }
);

// ================= GET BY ID =================

export const getSubscriptionPlanByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await getSubscriptionPlanByIdService(req.params.planId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plan fetched successfully",
        payload: {
          plan: mapSubscriptionPlanToResponseDto(plan),
        },
      })
    );
  }
);

// ================= UPDATE =================

export const updateSubscriptionPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await updateSubscriptionPlanService(req.params.planId as string, req.body);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plan updated successfully",
        payload: {
          plan: mapSubscriptionPlanToResponseDto(plan),
        },
      })
    );
  }
);

// ================= DELETE =================

export const deleteSubscriptionPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteSubscriptionPlanService(req.params.planId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plan deleted successfully",
      })
    );
  }
);

// ================= ACTIVATE =================

export const activateSubscriptionPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await activateSubscriptionPlanService(req.params.planId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plan activated successfully",
        payload: {
          plan: mapSubscriptionPlanToResponseDto(plan),
        },
      })
    );
  }
);

// ================= DEACTIVATE =================

export const deactivateSubscriptionPlanController = asyncHandler(
  async (req: Request, res: Response) => {
    const plan = await deactivateSubscriptionPlanService(req.params.planId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Subscription plan deactivated successfully",
        payload: {
          plan: mapSubscriptionPlanToResponseDto(plan),
        },
      })
    );
  }
);
