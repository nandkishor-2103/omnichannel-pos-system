import type { Request, Response } from "express";

import crypto from "crypto";

import SubscriptionPayment from "../models/subscriptionPayment.model.js";
import StoreSubscription from "../models/storeSubscription.model.js";
import SubscriptionPlan from "../models/subscriptionPlan.model.js";

import { PaymentStatus } from "../enums/paymentStatus.enum.js";
import { SubscriptionStatus } from "../enums/subscriptionStatus.enum.js";

import {
  createSubscriptionPaymentOrderService,
  getSubscriptionPaymentHistoryService,
} from "../services/subscriptionPayment.service.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import ENV_VAR from "../config/env.js";
import { createSubscriptionInvoiceService } from "../services/subscriptionInvoice.service.js";

// ==================================================
// CREATE PAYMENT ORDER
// ==================================================

export const createSubscriptionPaymentOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const { subscriptionPlanId } = req.body;

    const storeId = req.user?.store?.toString();

    if (!storeId) {
      throw new ApiError({
        statusCode: 400,
        message: "Store not found for current user",
      });
    }

    const result = await createSubscriptionPaymentOrderService(
      storeId,
      subscriptionPlanId
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Payment order created successfully",
        payload: result,
      })
    );
  }
);

// ==================================================
// VERIFY PAYMENT
// ==================================================

export const verifySubscriptionPaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        ENV_VAR.RAZORPAY_KEY_SECRET as string
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new ApiError({
        statusCode: 400,
        message: "Invalid payment signature",
      });
    }

    const payment = await SubscriptionPayment.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!payment) {
      throw new ApiError({
        statusCode: 404,
        message: "Payment record not found",
      });
    }

    // Prevent duplicate verification
    if (payment.status === PaymentStatus.SUCCESS) {
      return res.status(200).json(
        new ApiResponse({
          statusCode: 200,
          message: "Payment already verified",
          payload: {},
        })
      );
    }

    payment.status = PaymentStatus.SUCCESS;

    payment.razorpayPaymentId = razorpay_payment_id;

    payment.razorpaySignature = razorpay_signature;

    payment.paidAt = new Date();

    await payment.save();

    const plan = await SubscriptionPlan.findById(
      payment.subscriptionPlan
    );

    if (!plan) {
      throw new ApiError({
        statusCode: 404,
        message: "Subscription plan not found",
      });
    }

    // Deactivate existing subscriptions

    await StoreSubscription.updateMany(
      {
        store: payment.store,
        status: SubscriptionStatus.ACTIVE,
      },
      {
        status: SubscriptionStatus.EXPIRED,
      }
    );

    const startDate = new Date();

    const endDate = new Date(startDate);

    if (plan.billingCycle === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription =
      await StoreSubscription.create({
        store: payment.store,

        subscriptionPlan:
          payment.subscriptionPlan,

        startDate,

        endDate,

        status: SubscriptionStatus.ACTIVE,
      });

    // Create Invoice after successful subscription activation

    await createSubscriptionInvoiceService(
      payment._id.toString()
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message:
          "Subscription activated successfully",
        payload: {
          subscription,
        },
      })
    );
  }
);

// ==================================================
// GET PAYMENT HISTORY
// ==================================================
export const getSubscriptionPaymentHistoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const storeId = req.user?.store?.toString();

    const payments = await getSubscriptionPaymentHistoryService(storeId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Payment history fetched successfully",
        payload: {
          payments,
        },
      })
    );
  }
);
