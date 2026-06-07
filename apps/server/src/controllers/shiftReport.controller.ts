import type { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import type { IUser } from "../models/user.model.js";

import {
  startShiftService,
  endShiftService,
  getCurrentShiftProgressService,
  getShiftReportByIdService,
  getAllShiftReportsService,
  getShiftReportsByCashierService,
  getShiftReportsByBranchService,
  getShiftReportByCashierAndDateService,
  deleteShiftReportService,
} from "../services/shiftReport.service.js";

// ======================================================
// START SHIFT
// ======================================================

export const startShiftController = asyncHandler(async (req: Request, res: Response) => {
  const shiftReport = await startShiftService(req.body, req.user as IUser);

  res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Shift started successfully",
      payload: {
        shiftReport,
      },
    })
  );
});

// ======================================================
// END SHIFT
// ======================================================

export const endShiftController = asyncHandler(async (req: Request, res: Response) => {
  console.log("END SHIFT CONTROLLER HIT");
  const shiftReport = await endShiftService(req.user as IUser);

  res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Shift ended successfully",
      payload: {
        shiftReport,
      },
    })
  );
});

// ======================================================
// CURRENT SHIFT
// ======================================================

export const getCurrentShiftProgressController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReport = await getCurrentShiftProgressService(req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Current shift fetched successfully",
        payload: {
          shiftReport,
        },
      })
    );
  }
);

// ======================================================
// GET SHIFT BY ID
// ======================================================

export const getShiftReportByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReport = await getShiftReportByIdService(
      req.params.id as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Shift report fetched successfully",
        payload: {
          shiftReport,
        },
      })
    );
  }
);

// ======================================================
// GET ALL SHIFTS
// ======================================================

export const getAllShiftReportsController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReports = await getAllShiftReportsService(req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Shift reports fetched successfully",
        payload: {
          shiftReports,
        },
      })
    );
  }
);

// ======================================================
// GET SHIFTS BY CASHIER
// ======================================================

export const getShiftReportsByCashierController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReports = await getShiftReportsByCashierService(
      req.params.cashierId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Cashier shift reports fetched successfully",
        payload: {
          shiftReports,
        },
      })
    );
  }
);

// ======================================================
// GET SHIFTS BY BRANCH
// ======================================================

export const getShiftReportsByBranchController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReports = await getShiftReportsByBranchService(
      req.params.branchId as string,
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Branch shift reports fetched successfully",
        payload: {
          shiftReports,
        },
      })
    );
  }
);

// ======================================================
// GET SHIFT BY CASHIER & DATE
// ======================================================

export const getShiftReportByCashierAndDateController = asyncHandler(
  async (req: Request, res: Response) => {
    const shiftReport = await getShiftReportByCashierAndDateService(
      req.params.cashierId as string,
      new Date(req.query.date as string),
      req.user as IUser
    );

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Shift report fetched successfully",
        payload: {
          shiftReport,
        },
      })
    );
  }
);

// ======================================================
// DELETE SHIFT REPORT
// ======================================================

export const deleteShiftReportController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteShiftReportService(req.params.id as string, req.user as IUser);

    res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Shift report deleted successfully",
      })
    );
  }
);
