import type { SubscriptionPaymentDocument } from "../models/subscriptionPayment.model.js";

import type { SubscriptionPaymentResponseDto } from "../types/subscriptionPayment.dto.js";

export const mapSubscriptionPaymentToResponseDto = (
  payment: SubscriptionPaymentDocument
): SubscriptionPaymentResponseDto => {
  return {
    _id: payment._id.toString(),

    store: payment.store.toString(),

    subscriptionPlan: payment.subscriptionPlan.toString(),

    amount: payment.amount,

    status: payment.status,

    razorpayOrderId: payment.razorpayOrderId,

    ...(payment.razorpayPaymentId && {
      razorpayPaymentId: payment.razorpayPaymentId,
    }),

    ...(payment.razorpaySignature && {
      razorpaySignature: payment.razorpaySignature,
    }),

    ...(payment.paidAt && {
      paidAt: payment.paidAt,
    }),

    ...(payment.createdAt && {
      createdAt: payment.createdAt,
    }),

    ...(payment.updatedAt && {
      updatedAt: payment.updatedAt,
    }),
  };
};
