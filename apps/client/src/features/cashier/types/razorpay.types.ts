export interface RazorpaySuccessResponse {
  razorpay_order_id: string;

  razorpay_payment_id: string;

  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;

  amount: number;

  currency: string;

  name: string;

  description: string;

  order_id: string;

  handler: (response: RazorpaySuccessResponse) => void;

  theme?: {
    color?: string;
  };

  modal?: {
    ondismiss?: () => void;
  };
}
