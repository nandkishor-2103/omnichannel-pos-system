import type { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createStoreService,
  getStoreByIdService,
  updateStoreService,
  deleteStoreService,
  getAdminStoreService,
  getEmployeeStoreService,
  addEmployeeService,
  getStoreEmployeesService,
  moderateStoreService,
  getAllStoresService,
  deactivateStoreService,
  activateStoreService,
} from "../services/store.service.js";
import type { IUser } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

/**
 * @desc Create Store
 * @route POST /api/stores
 * @access Private
 */
export const createStoreController = asyncHandler(async (req: Request, res: Response) => {
  const store = await createStoreService({
    ...req.body,
    adminId: req.user?._id.toString(),
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

/**
 * @desc Get Store by ID
 * @route GET /api/stores/:id
 * @access Private
 */
export const getStoreByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const store = await getStoreByIdService(req.params.id as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store fetched successfully",
        payload: {
          store,
        },
      })
    );
  }
);

/**
 * @desc Update Store
 * @route PUT /api/stores/:id
 * @access Private
 */
export const updateStoreController = asyncHandler(async (req: Request, res: Response) => {
  const updatedStore = await updateStoreService(
    req.params.id as string,
    req.user?._id.toString() as string,
    req.body
  );

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Store updated successfully",
      payload: {
        store: updatedStore,
      },
    })
  );
});

/**
 * @desc Delete Store
 * @route DELETE /api/stores
 * @access Private
 */
export const deleteStoreController = asyncHandler(async (req: Request, res: Response) => {
  await deleteStoreService(req.user?._id.toString() as string);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Store deleted successfully",
    })
  );
});

/**
 * @desc Get Admin Store
 * @route GET /api/stores/admin
 * @access Private
 */
export const getAdminStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const store = await getAdminStoreService(req.user?._id.toString() as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Admin store fetched successfully",
        payload: {
          store,
        },
      })
    );
  }
);

/**
 * @desc Get Employee Store
 * @route GET /api/stores/employee
 * @access Private
 */
export const getEmployeeStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const store = await getEmployeeStoreService(req.user?._id.toString() as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee store fetched successfully",
        payload: {
          store,
        },
      })
    );
  }
);

/**
 * @desc Add Employee to Store
 * @route POST /api/stores/employees
 * @access Private
 */
export const addEmployeeController = asyncHandler(async (req: Request, res: Response) => {
  const employee = await addEmployeeService(req.user?._id.toString() as string, req.body);

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Employee added successfully",
      payload: {
        employee,
      },
    })
  );
});

/**
 * @desc Get Store Employees
 * @route GET /api/stores/:storeId/employees
 * @access Private
 */
export const getStoreEmployeesController = asyncHandler(
  async (req: Request, res: Response) => {
    const employees = await getStoreEmployeesService(req.params.storeId as string);

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

/**
 * @desc Moderate Store (Active/Pending/Blocked)
 * @route POST /api/stores/:storeId/moderate?action=approve|pending|blocked
 * @access Private (Admin only)
 */
export const moderateStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const store = await moderateStoreService(
      req.params.storeId as string,
      req.query.action as string
    );

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store status updated successfully",
        payload: {
          store,
        },
      })
    );
  }
);

/**
 * @desc Get All Stores (with optional status filter)
 * @route GET /api/stores?status=active|pending|blocked
 * @access Private (Admin only)
 */
export const getAllStoresController = asyncHandler(
  async (req: Request, res: Response) => {
    const stores = await getAllStoresService(req.query.status as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Stores fetched successfully",
        payload: {
          stores,
        },
      })
    );
  }
);

export const deactivateStoreController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const store = await deactivateStoreService(req.user._id);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Store deactivated successfully",
      payload: {
        store,
      },
    })
  );
});

export const activateStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const { storeId } = req.params;

    const store = await activateStoreService(storeId as string);

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Store activated successfully",
        payload: {
          store,
        },
      })
    );
  }
);
