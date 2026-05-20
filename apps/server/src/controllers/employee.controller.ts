import type { Request, Response } from "express";
import {
  createBranchEmployeeService,
  createStoreEmployeeService,
  deleteEmployeeService,
  getBranchEmployeesService,
  getEmployeeByIdService,
  getStoreEmployeesService,
  updateEmployeeService,
} from "../services/employee.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createStoreEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await createStoreEmployeeService(req.body, req.params.storeId as string);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Store employee created successfully",
        payload: {
          employee,
        },
      })
    );
  }
);

export const createBranchEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await createBranchEmployeeService(
      req.body,
      req.params.branchId as string,
      req.user!
    );

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Branch employee created successfully",
        payload: {
          employee,
        },
      })
    );
  }
);

export const updateEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await updateEmployeeService(
      req.params.employeeId as string,
      req.body,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee updated successfully",
        payload: {
          employee,
        },
      })
    );
  }
);

export const deleteEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteEmployeeService(req.params.employeeId as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee deleted successfully",
      })
    );
  }
);

export const getEmployeeByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await getEmployeeByIdService(req.params.employeeId as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee fetched successfully",
        payload: {
          employee,
        },
      })
    );
  }
);

export const getStoreEmployeesController = asyncHandler(
  async (req: Request, res: Response) => {
    const employees = await getStoreEmployeesService(req.params.storeId as string, req.user!);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store employees fetched successfully",
        payload: {
          employees,
        },
      })
    );
  }
);

export const getBranchEmployeesController = asyncHandler(
  async (req: Request, res: Response) => {
    const role = typeof req.query.role === "string" ? req.query.role : undefined;

    const employees = await getBranchEmployeesService(
      req.params.branchId as string,
      role,
      req.user!
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch employees fetched successfully",
        payload: {
          employees,
        },
      })
    );
  }
);
