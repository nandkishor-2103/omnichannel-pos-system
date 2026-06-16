import razorpayInstance from "../config/razorpay.js";
import crypto from "crypto";

import ENV_VAR from "../config/env.js";

export const createPaymentOrderService = async (amount: number) => {
  const order = await razorpayInstance.orders.create({
    amount: Math.round(amount * 100),

    currency: "INR",
  });

  return order;
};

export const verifyPaymentService = (
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) => {
  const generatedSignature = crypto
    .createHmac("sha256", ENV_VAR.RAZORPAY_KEY_SECRET as string)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  return generatedSignature === razorpay_signature;
};
