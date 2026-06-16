import Razorpay from "razorpay";

import ENV_VAR from "./env.js";

const razorpay = new Razorpay({
  key_id: ENV_VAR.RAZORPAY_KEY_ID,
  key_secret: ENV_VAR.RAZORPAY_KEY_SECRET,
});

export default razorpay;
