import { Router } from "express";
import {
  signup,
  resendVerificationOtp,
  verifyOtp,
  login,
  logout,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  checkSession,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/resend-verification-otp", resendVerificationOtp);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
router.post("/signin", login);
router.post("/logout", logout);
router.get("/session", checkSession);

export { router as authRoutes };
