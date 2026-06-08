import asyncHandler from "../utils/asyncHandler.js";

import ApiResponse from "../utils/ApiResponse.js";

import {
  getDailySalesChartService,
  getTopProductsService,
  getTopCashiersService,
  getCategorySalesService,
  getTodayOverviewService,
  getPaymentBreakdownService,
} from "../services/branchAnalytics.service.js";

// ======================================================
// DAILY SALES
// ======================================================

export const getDailySalesChartController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const days = Number(req.query.days) || 7;

  const sales = await getDailySalesChartService(branchId, days);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Daily sales fetched successfully",
      payload: {
        sales,
      },
    })
  );
});

// ======================================================
// TOP PRODUCTS
// ======================================================

export const getTopProductsController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const products = await getTopProductsService(branchId);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Top products fetched successfully",
      payload: {
        products,
      },
    })
  );
});

// ======================================================
// TOP CASHIERS
// ======================================================

export const getTopCashiersController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const cashiers = await getTopCashiersService(branchId);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Top cashiers fetched successfully",
      payload: {
        cashiers,
      },
    })
  );
});

// ======================================================
// CATEGORY SALES
// ======================================================

export const getCategorySalesController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const date = new Date(req.query.date as string);

  const categories = await getCategorySalesService(branchId, date);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Category sales fetched successfully",
      payload: {
        categories,
      },
    })
  );
});

// ======================================================
// TODAY OVERVIEW
// ======================================================

export const getTodayOverviewController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const overview = await getTodayOverviewService(branchId);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Today overview fetched successfully",
      payload: {
        overview,
      },
    })
  );
});

// ======================================================
// PAYMENT BREAKDOWN
// ======================================================

export const getPaymentBreakdownController = asyncHandler(async (req, res) => {
  const branchId = req.query.branchId as string;

  const date = new Date(req.query.date as string);

  const payments = await getPaymentBreakdownService(branchId, date);

  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Payment breakdown fetched successfully",
      payload: {
        payments,
      },
    })
  );
});
