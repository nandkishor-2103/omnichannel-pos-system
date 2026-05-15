import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesByStoreService,
  updateCategoryService,
} from "../services/category.service.js";
import { mapCategoryToResponse } from "../mappers/category.mapper.js";

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private (Store Admins and Store Managers)
 */
export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await createCategoryService(req.body, req.user!);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Category created successfully",
        payload: {
          category: mapCategoryToResponse(category),
        },
      })
    );
  }
);

/**
 * @desc    Get categories by store ID
 * @route   GET /api/stores/:storeId/categories
 * @access  Private (Store Admins and Store Managers)
 */
export const getCategoriesByStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const categories = await getCategoriesByStoreService(req.params.storeId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Categories fetched successfully",
        payload: {
          categories: categories.map(mapCategoryToResponse),
        },
      })
    );
  }
);

/**
 * @desc    Update a category
 * @route   PUT /api/categories/:id
 * @access  Private (Store Admins and Store Managers)
 */
export const updateCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const category = await updateCategoryService(
      req.params.id as string,
      req.body,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Category updated successfully",
        payload: {
          category: mapCategoryToResponse(category),
        },
      })
    );
  }
);

/**
 * @desc    Delete a category
 * @route   DELETE /api/categories/:id
 * @access  Private (Store Admins and Store Managers)
 */
export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteCategoryService(req.params.id as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Category deleted successfully",
      })
    );
  }
);
