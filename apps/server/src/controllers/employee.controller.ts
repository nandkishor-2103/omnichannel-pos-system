import type { Request, Response } from "express";
import {
  createBranchEmployeeService,
  createStoreEmployeeService,
  deleteEmployeeService,
  disableEmployeeService,
  enableEmployeeService,
  getBranchEmployeesService,
  getEmployeeByIdService,
  getStoreEmployeesService,
  updateEmployeeService,
} from "../services/employee.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import type { IUser } from "../models/user.model.js";

export const createStoreEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await createStoreEmployeeService(
      req.body,
      req.params.storeId as string,
      req.user!
    );

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
    const employee = await getEmployeeByIdService(
      req.params.employeeId as string,
      req.user!
    );

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
    const employees = await getStoreEmployeesService(
      req.params.storeId as string,
      req.user!
    );

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

export const enableEmployeeController = asyncHandler(async (req, res) => {
  const employee = await enableEmployeeService(
    req.params.employeeId as string,
    req.user as IUser
  );

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Employee enabled successfully",
      payload: { employee },
    })
  );
});

export const disableEmployeeController = asyncHandler(async (req, res) => {
  const employee = await disableEmployeeService(
    req.params.employeeId as string,
    req.user as IUser
  );

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Employee disabled successfully",
      payload: { employee },
    })
  );
});
