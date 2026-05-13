import { Router } from "express";
import {
  getUserByIdController,
  getUserProfileController,
} from "../controllers/user.controller.js";
import { getUserByIdValidation } from "../validators/user.validator.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/profile", isAuthenticated, getUserProfileController);
router.get("/:id", isAuthenticated, getUserByIdValidation, getUserByIdController);

export { router as userRoutes };
