// ==========================================
// CREATE PAYMENT ORDER RESPONSE
// ==========================================

export interface CreateSubscriptionPaymentOrderResponse {
  statusCode: number;

  message: string;

  payload: {
    payment: {
      _id: string;

      store: string;

      subscriptionPlan: string;

      amount: number;

      status: "PENDING" | "SUCCESS" | "FAILED";

      razorpayOrderId: string;

      createdAt: string;

      updatedAt: string;
    };

    razorpayOrder: {
      id: string;

      amount: number;

      currency: string;
    };
  };
}

// ==========================================
// VERIFY PAYMENT REQUEST
// ==========================================

export interface VerifySubscriptionPaymentPayload {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}

// ==========================================
// VERIFY PAYMENT RESPONSE
// ==========================================

export interface VerifySubscriptionPaymentResponse {
  statusCode: number;

  message: string;

  payload: {
    subscription: {
      _id: string;

      store: string;

      subscriptionPlan: string;

      startDate: string;

      endDate: string;

      status: "ACTIVE" | "EXPIRED" | "CANCELLED";

      createdAt: string;

      updatedAt: string;
    };
  };
}

// ==========================================
// RAZORPAY HANDLER RESPONSE
// ==========================================

export interface RazorpaySuccessResponse {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}

// ==========================================
// RAZORPAY OPTIONS
// ==========================================

export interface RazorpayOptions {
  key: string;

  amount: number;

  currency: string;

  name: string;

  description: string;

  order_id: string;

  handler: (response: RazorpaySuccessResponse) => void;

  prefill?: {
    name?: string;

    email?: string;

    contact?: string;
  };

  theme?: {
    color?: string;
  };

  modal?: {
    ondismiss?: () => void;
  };
}
