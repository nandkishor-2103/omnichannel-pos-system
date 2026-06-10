import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createProductService,
  deleteProductService,
  getProductByIdService,
  getProductsByStoreService,
  getProductsForCashierService,
  searchProductsService,
  updateProductService,
} from "../services/product.service.js";
import type { IUser } from "../models/user.model.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Store Admins and Managers)
 */
export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await createProductService(req.body, req.user!);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Product created successfully",
        payload: {
          product,
        },
      })
    );
  }
);

/**
 * @desc    Get a product by ID
 * @route   GET /api/products/:id
 * @access  Private (Store Admins and Managers)
 */
export const getProductByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await getProductByIdService(req.params.id as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Product fetched successfully",
        payload: {
          product,
        },
      })
    );
  }
);

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private (Store Admins and Managers)
 */
export const updateProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await updateProductService(
      req.params.id as string,
      req.body,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Product updated successfully",
        payload: {
          product,
        },
      })
    );
  }
);

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private (Store Admins and Managers)
 */
export const deleteProductController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteProductService(req.params.id as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Product deleted successfully",
      })
    );
  }
);

/**
 * @desc    Get products by store ID
 * @route   GET /api/stores/:storeId/products
 * @access  Private (Store Admins and Managers)
 */
export const getProductsByStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("USER BRANCH =>", (req.user as IUser)?.branch);
    const products = await getProductsByStoreService(
      req.params.storeId as string,
      (req.user as IUser)?.branch?.toString()
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Products fetched successfully",
        payload: {
          products,
        },
      })
    );
  }
);

/**
 * @desc    Search products within a store
 * @route   GET /api/stores/:storeId/products/search?q=searchTerm
 * @access  Private (Store Admins and Managers)
 */
export const searchProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const products = await searchProductsService(
      req.params.storeId as string,
      req.query.q as string,
      req.user as IUser
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Products fetched successfully",
        payload: {
          products,
        },
      })
    );
  }
);

export const getCashierProductsController = asyncHandler(async (req, res) => {
  const products = await getProductsForCashierService(req.user as IUser);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Products fetched successfully",
      payload: { products },
    })
  );
});
