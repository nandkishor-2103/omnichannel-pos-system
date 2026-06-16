import razorpay from "../config/razorpay.js";

import SubscriptionPlan from "../models/subscriptionPlan.model.js";
import SubscriptionPayment from "../models/subscriptionPayment.model.js";

import { PaymentStatus } from "../enums/paymentStatus.enum.js";

import ApiError from "../utils/ApiError.js";

export const createSubscriptionPaymentOrderService = async (
  storeId: string,
  subscriptionPlanId: string
) => {
  const plan = await SubscriptionPlan.findById(subscriptionPlanId);

  if (!plan) {
    throw new ApiError({
      statusCode: 404,
      message: "Subscription plan not found",
    });
  }

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(plan.price * 100), // paise
    currency: "INR",
    receipt: `sub_${Date.now()}`,
  });

  await SubscriptionPayment.create({
    store: storeId,

    subscriptionPlan: subscriptionPlanId,

    amount: plan.price,

    status: PaymentStatus.PENDING,

    razorpayOrderId: razorpayOrder.id,
  });

  return {
    orderId: razorpayOrder.id,

    amount: razorpayOrder.amount,

    currency: razorpayOrder.currency,

    key: process.env.RAZORPAY_KEY_ID,

    plan,
  };
};

// ==================================================
// GET PAYMENT HISTORY
// ==================================================
export const getSubscriptionPaymentHistoryService = async (storeId: string) => {
  return SubscriptionPayment.find({
    store: storeId,
  })
    .populate("subscriptionPlan", "name")
    .sort({
      createdAt: -1,
    });
};
