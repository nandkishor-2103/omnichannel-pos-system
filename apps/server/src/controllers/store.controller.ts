import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createStoreService } from "../services/store.service.js";

/**
 * @desc Create Store
 * @route POST /api/stores
 * @access Private
 */
export const createStoreController = asyncHandler(async (req: Request, res: Response) => {
  const { brand, description, storeType, contact } = req.body;

  const store = await createStoreService({
    brand,
    description,
    storeType,
    contact,
    adminId: req.user?._id.toString() || "",
  });

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Store created successfully",
      payload: {
        store,
      },
    })
  );
});
