import type { Request, Response } from "express";
import {
  createCustomerService,
  updateCustomerService,
  deleteCustomerService,
  getCustomerByIdService,
  getAllCustomersService,
  searchCustomersService,
} from "../services/customer.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await createCustomerService(req.body, req.user!);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Customer created successfully",
        payload: {
          customer,
        },
      })
    );
  }
);

export const updateCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await updateCustomerService(
      req.params.customerId as string,
      req.body,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customer updated successfully",
        payload: {
          customer,
        },
      })
    );
  }
);

export const deleteCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteCustomerService(req.params.customerId as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customer deleted successfully",
      })
    );
  }
);

export const getCustomerByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await getCustomerByIdService(req.params.customerId as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customer fetched successfully",
        payload: {
          customer,
        },
      })
    );
  }
);

export const getAllCustomersController = asyncHandler(
  async (req: Request, res: Response) => {
    const customers = await getAllCustomersService(req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customers fetched successfully",
        payload: {
          customers,
        },
      })
    );
  }
);

export const searchCustomersController = asyncHandler(
  async (req: Request, res: Response) => {
    const keyword = req.query.q as string;

    const customers = await searchCustomersService(keyword, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customers fetched successfully",
        payload: {
          customers,
        },
      })
    );
  }
);