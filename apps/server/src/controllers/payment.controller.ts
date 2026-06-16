import {
  createPaymentOrderService,
  verifyPaymentService,
} from "../services/payment.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import ENV_VAR from "../config/env.js";

export const createPaymentOrderController = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const order = await createPaymentOrderService(amount);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Payment order created successfully",
      payload: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: ENV_VAR.RAZORPAY_KEY_ID,
      },
    })
  );
});

export const verifyPaymentController = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const isValid = verifyPaymentService(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid payment signature",
    });
  }

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Payment verified successfully",
    })
  );
});
