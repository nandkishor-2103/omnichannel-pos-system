import mongoose from "mongoose";

import Order from "../models/order.model.js";

import ApiError from "../utils/ApiError.js";

import { Inventory } from "../models/inventory.model.js";

import { PaymentType } from "../enums/paymentType.enums.js";

import type {
  DailySalesDto,
  ProductPerformanceDto,
  CashierPerformanceDto,
  CategorySalesDto,
  TodayOverviewDto,
  PaymentBreakdownDto,
} from "../types/branchAnalytics.types.js";

const calculateGrowth = (today: number, yesterday: number): number => {
  if (yesterday === 0) {
    return 0;
  }

  return Number((((today - yesterday) / yesterday) * 100).toFixed(2));
};

// ======================================================
// GET DAILY SALES CHART
// ======================================================

export const getDailySalesChartService = async (
  branchId: string,
  days = 7
): Promise<DailySalesDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const today = new Date();

  const startDate = new Date();
  startDate.setDate(today.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  const sales = await Order.aggregate([
    {
      $match: {
        branch: new mongoose.Types.ObjectId(branchId),
        createdAt: {
          $gte: startDate,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const salesMap = new Map<string, number>();

  sales.forEach((item) => {
    salesMap.set(item._id, item.totalSales);
  });

  const result: DailySalesDto[] = [];

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);

    date.setDate(startDate.getDate() + i);

    const formattedDate = date.toISOString().split("T")[0]!;

    result.push({
      date: formattedDate,
      totalSales: salesMap.get(formattedDate) ?? 0,
    });
  }

  return result;
};

// ======================================================
// GET TOP PRODUCTS
// ======================================================

export const getTopProductsService = async (
  branchId: string
): Promise<ProductPerformanceDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const products = await Order.aggregate([
    {
      $match: {
        branch: new mongoose.Types.ObjectId(branchId),
      },
    },

    {
      $unwind: "$items",
    },

    {
      $group: {
        _id: "$items.product",

        quantitySold: {
          $sum: "$items.quantity",
        },
      },
    },

    {
      $sort: {
        quantitySold: -1,
      },
    },

    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },
  ]);

  const totalQuantity = products.reduce((sum, item) => sum + item.quantitySold, 0);

  return products.map((item) => ({
    productId: item._id.toString(),

    productName: item.product.name,

    quantitySold: item.quantitySold,

    percentage:
      totalQuantity === 0
        ? 0
        : Number(((item.quantitySold / totalQuantity) * 100).toFixed(1)),
  }));
};

// ======================================================
// GET TOP CASHIERS
// ======================================================

export const getTopCashiersService = async (
  branchId: string
): Promise<CashierPerformanceDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const cashiers = await Order.aggregate([
    {
      $match: {
        branch: new mongoose.Types.ObjectId(branchId),
      },
    },

    {
      $group: {
        _id: "$cashier",

        totalOrders: {
          $sum: 1,
        },

        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $sort: {
        totalRevenue: -1,
      },
    },

    {
      $limit: 5,
    },

    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "cashier",
      },
    },

    {
      $unwind: "$cashier",
    },
  ]);

  return cashiers.map((item) => ({
    cashierId: item._id.toString(),

    cashierName: item.cashier.fullName,

    totalOrders: item.totalOrders,

    totalRevenue: item.totalRevenue,
  }));
};

export const getCategorySalesService = async (
  branchId: string,
  date: Date
): Promise<CategorySalesDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const result = await Order.aggregate([
    {
      $match: {
        branch: new mongoose.Types.ObjectId(branchId),
        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },

    {
      $unwind: "$items",
    },

    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "product",
      },
    },

    {
      $unwind: "$product",
    },

    {
      $lookup: {
        from: "categories",
        localField: "product.category",
        foreignField: "_id",
        as: "category",
      },
    },

    {
      $unwind: "$category",
    },

    {
      $group: {
        _id: "$category._id",

        categoryName: {
          $first: "$category.name",
        },

        totalSales: {
          $sum: {
            $multiply: ["$items.quantity", "$items.price"],
          },
        },

        quantitySold: {
          $sum: "$items.quantity",
        },
      },
    },

    {
      $sort: {
        totalSales: -1,
      },
    },
  ]);

  return result.map((item) => ({
    categoryId: item._id.toString(),
    categoryName: item.categoryName,
    totalSales: item.totalSales,
    quantitySold: item.quantitySold,
  }));
};

export const getPaymentBreakdownService = async (
  branchId: string,
  date: Date
): Promise<PaymentBreakdownDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const breakdown = await Order.aggregate([
    {
      $match: {
        branch: new mongoose.Types.ObjectId(branchId),

        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },

    {
      $group: {
        _id: "$paymentType",

        totalAmount: {
          $sum: "$totalAmount",
        },

        transactionCount: {
          $sum: 1,
        },
      },
    },
  ]);

  const totalSales = breakdown.reduce((sum, item) => sum + item.totalAmount, 0);

  return breakdown.map((item) => ({
    type: item._id as PaymentType,

    totalAmount: item.totalAmount,

    transactionCount: item.transactionCount,

    percentage:
      totalSales === 0 ? 0 : Number(((item.totalAmount / totalSales) * 100).toFixed(2)),
  }));
};

export const getTodayOverviewService = async (
  branchId: string
): Promise<TodayOverviewDto> => {
  if (!mongoose.Types.ObjectId.isValid(branchId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid branch ID",
    });
  }

  const branchObjectId = new mongoose.Types.ObjectId(branchId);

  const today = new Date();

  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const yesterdayEnd = new Date(todayEnd);
  yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);

  const [todayStats, yesterdayStats, lowStockItems] = await Promise.all([
    Order.aggregate([
      {
        $match: {
          branch: branchObjectId,
          createdAt: {
            $gte: todayStart,
            $lte: todayEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
          totalOrders: {
            $sum: 1,
          },
          cashiers: {
            $addToSet: "$cashier",
          },
        },
      },
    ]),

    Order.aggregate([
      {
        $match: {
          branch: branchObjectId,
          createdAt: {
            $gte: yesterdayStart,
            $lte: yesterdayEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
          totalOrders: {
            $sum: 1,
          },
          cashiers: {
            $addToSet: "$cashier",
          },
        },
      },
    ]),

    Inventory.countDocuments({
      branch: branchObjectId,
      quantity: {
        $lte: 5,
      },
    }),
  ]);

  const todayData = todayStats[0] ?? {
    totalSales: 0,
    totalOrders: 0,
    cashiers: [],
  };

  const yesterdayData = yesterdayStats[0] ?? {
    totalSales: 0,
    totalOrders: 0,
    cashiers: [],
  };

  return {
    totalSales: todayData.totalSales,

    salesGrowth: calculateGrowth(todayData.totalSales, yesterdayData.totalSales),

    ordersToday: todayData.totalOrders,

    orderGrowth: calculateGrowth(todayData.totalOrders, yesterdayData.totalOrders),

    activeCashiers: todayData.cashiers.length,

    cashierGrowth: calculateGrowth(
      todayData.cashiers.length,
      yesterdayData.cashiers.length
    ),

    lowStockItems,

    lowStockGrowth: 0,
  };
};
