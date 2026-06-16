export interface SubscriptionPayment {
  _id: string;

  store: string;

  subscriptionPlan: string;

  amount: number;

  status: "PENDING" | "SUCCESS" | "FAILED";

  razorpayOrderId: string;

  razorpayPaymentId?: string;

  razorpaySignature?: string;

  paidAt?: string;

  createdAt?: string;

  updatedAt?: string;
}

// ==========================================
// CREATE PAYMENT ORDER
// ==========================================

export interface CreateSubscriptionPaymentPayload {
  subscriptionPlanId: string;
}

export interface CreateSubscriptionPaymentResponse {
  statusCode: number;

  success: boolean;

  message: string;

  payload: {
    orderId: string;

    amount: number;

    currency: string;

    key: string;

    plan: {
      _id: string;
      name: string;
      description: string;
      price: number;
      billingCycle: "MONTHLY" | "YEARLY";
    };
  };
}

// ==========================================
// VERIFY PAYMENT
// ==========================================

export interface VerifySubscriptionPaymentPayload {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}

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

      createdAt?: string;

      updatedAt?: string;
    };
  };
}

// ==========================================
// PAYMENT HISTORY
// ==========================================

export interface SubscriptionPaymentHistoryResponse {
  statusCode: number;

  message: string;

  payload: {
    payments: SubscriptionPayment[];
  };
}

// ==========================================
// REDUX STATE
// ==========================================

export interface SubscriptionPaymentState {
  payments: SubscriptionPayment[];

  loading: boolean;

  creatingOrder: boolean;

  verifyingPayment: boolean;

  error: string | null;
}
