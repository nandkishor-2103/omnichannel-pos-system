import { Router } from "express";
import {
  createBranchController,
  deleteBranchController,
  getBranchByIdController,
  getBranchesByStoreController,
  updateBranchController,
} from "../controllers/branch.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import {
  createBranchValidation,
  updateBranchValidation,
} from "../validators/branch.validation.js";

const router = Router();

router.post("/", isAuthenticated, createBranchValidation, createBranchController);

router.get("/store/:storeId", isAuthenticated, getBranchesByStoreController);

router.get("/:id", isAuthenticated, getBranchByIdController);

router.put("/:id", isAuthenticated, updateBranchValidation, updateBranchController);

router.delete("/:id", isAuthenticated, deleteBranchController);

export { router as branchRoutes };
