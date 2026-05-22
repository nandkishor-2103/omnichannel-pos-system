import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import type { IUser } from "../models/user.model.js";

import {
  createOrderService,
  deleteOrderService,
  getOrderByIdService,
  getOrdersByBranchService,
  getOrdersByCashierService,
  getOrdersByCustomerService,
  getTodayOrdersByBranchService,
  getTop5RecentOrdersByBranchService,
} from "../services/order.service.js";

export const createOrderController = asyncHandler(async (req: Request, res: Response) => {
  const order = await createOrderService(req.body, req.user as IUser);

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Order created successfully",
      payload: {
        order,
      },
    })
  );
});

export const getOrderByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await getOrderByIdService(req.params.id as string, req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Order fetched successfully",
        payload: {
          order,
        },
      })
    );
  }
);

export const getOrdersByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrdersByBranchService(
      req.params.branchId as string,
      {
        customerId: req.query.customerId as string,
        cashierId: req.query.cashierId as string,
        paymentType: req.query.paymentType as string,
        status: req.query.status as string,
      },
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch orders fetched successfully",
        payload: {
          orders,
        },
      })
    );
  }
);

export const getOrdersByCashierController = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrdersByCashierService(
      req.params.cashierId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Cashier orders fetched successfully",
        payload: {
          orders,
        },
      })
    );
  }
);

export const getTodayOrdersByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getTodayOrdersByBranchService(
      req.params.branchId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Today orders fetched successfully",
        payload: {
          orders,
        },
      })
    );
  }
);

export const getOrdersByCustomerController = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getOrdersByCustomerService(
      req.params.customerId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Customer orders fetched successfully",
        payload: {
          orders,
        },
      })
    );
  }
);

export const getTop5RecentOrdersByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const orders = await getTop5RecentOrdersByBranchService(
      req.params.branchId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Top 5 recent orders fetched successfully",
        payload: {
          orders,
        },
      })
    );
  }
);

export const deleteOrderController = asyncHandler(async (req: Request, res: Response) => {
  await deleteOrderService(req.params.id as string, req.user as IUser);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Order deleted successfully",
    })
  );
});
