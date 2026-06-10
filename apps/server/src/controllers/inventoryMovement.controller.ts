import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
  getInventoryMovementsService,
  getInventoryMovementsByProductService,
} from "../services/inventoryMovement.service.js";

export const getInventoryMovementsController = asyncHandler(
  async (_req: Request, res: Response) => {
    const movements = await getInventoryMovementsService();

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Inventory movements fetched successfully",
        payload: {
          movements,
        },
      })
    );
  }
);

export const getInventoryMovementsByProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    const movements = await getInventoryMovementsByProductService(productId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Product inventory movements fetched successfully",
        payload: {
          movements,
        },
      })
    );
  }
);
