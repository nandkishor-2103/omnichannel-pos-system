import { Router } from "express";
import {
  signup,
  verifyOtp,
  login,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", isAuthenticated, getProfile);
router.get("/admin-only", isAuthenticated, authorizeRoles("ROLE_ADMIN"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

export default router;
