import type { Request, Response } from "express";
import {
  createBranchService,
  deleteBranchService,
  getBranchByIdService,
  getBranchesByStoreService,
  updateBranchService,
} from "../services/branch.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const branch = await createBranchService(req.body, req.user!);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Branch created successfully",
        payload: {
          branch,
        },
      })
    );
  }
);

export const getBranchByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const branch = await getBranchByIdService(req.params.id as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch fetched successfully",
        payload: {
          branch,
        },
      })
    );
  }
);

export const getBranchesByStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const branches = await getBranchesByStoreService(
      req.params.storeId as string,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branches fetched successfully",
        payload: {
          branches,
        },
      })
    );
  }
);

export const updateBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const branch = await updateBranchService(
      req.params.id as string,
      req.body,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch updated successfully",
        payload: {
          branch,
        },
      })
    );
  }
);

export const deleteBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteBranchService(req.params.id as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch deleted successfully",
      })
    );
  }
);
