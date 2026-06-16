import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayRefund = async (paymentId: string, amount: number) => {
  return razorpay.payments.refund(paymentId, {
    amount: Math.round(amount * 100),
  });
};
