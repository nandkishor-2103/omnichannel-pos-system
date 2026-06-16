export interface CreateOrderPaymentRequest {
  amount: number;
}

export interface CreateOrderPaymentResponse {
  statusCode: number;

  success: boolean;

  message: string;

  payload: {
    orderId: string;

    amount: number;

    currency: string;

    key: string;
  };
}

export interface VerifyOrderPaymentRequest {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}

export interface VerifyOrderPaymentResponse {
  statusCode: number;

  success: boolean;

  message: string;
}

export interface OrderPaymentState {
  creatingOrder: boolean;

  verifyingPayment: boolean;

  error: string | null;
}
