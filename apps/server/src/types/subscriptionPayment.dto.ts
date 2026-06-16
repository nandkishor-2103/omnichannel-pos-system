export interface SubscriptionPaymentResponseDto {
  _id: string;

  store: string;

  subscriptionPlan: string;

  amount: number;

  status: "PENDING" | "SUCCESS" | "FAILED";

  razorpayOrderId: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  paidAt?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}

export interface CreateSubscriptionPaymentOrderDto {
  subscriptionPlanId: string;
}

export interface VerifySubscriptionPaymentDto {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}
