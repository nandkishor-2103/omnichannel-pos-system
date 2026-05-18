import type { Request, Response } from "express";
import {
  createInventoryService,
  deleteInventoryService,
  getInventoryByBranchService,
  getInventoryByIdService,
  getInventoryByProductIdService,
  updateInventoryService,
} from "../services/inventory.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createInventoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const inventory = await createInventoryService(req.body);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Inventory created successfully",
        payload: {
          inventory,
        },
      })
    );
  }
);

export const updateInventoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const inventory = await updateInventoryService(req.params.id as string, req.body);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Inventory updated successfully",
        payload: {
          inventory,
        },
      })
    );
  }
);

export const deleteInventoryController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteInventoryService(req.params.id as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Inventory deleted successfully",
      })
    );
  }
);

export const getInventoryByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const inventory = await getInventoryByIdService(req.params.id as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Inventory fetched successfully",
        payload: {
          inventory,
        },
      })
    );
  }
);

export const getInventoryByProductIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const inventories = await getInventoryByProductIdService(
      req.params.productId as string
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Product inventory fetched successfully",
        payload: {
          inventories,
        },
      })
    );
  }
);

export const getInventoryByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const inventories = await getInventoryByBranchService(req.params.branchId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch inventories fetched successfully",
        payload: {
          inventories,
        },
      })
    );
  }
);
