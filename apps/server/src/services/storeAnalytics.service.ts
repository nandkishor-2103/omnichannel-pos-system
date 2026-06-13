import mongoose from "mongoose";

import Store from "../models/store.model.js";
import Branch from "../models/branch.model.js";
import Order from "../models/order.model.js";
import Refund from "../models/refund.model.js";
import User from "../models/user.model.js";
import Customer from "../models/customer.model.js";
import { Product } from "../models/product.model.js";
import { Inventory } from "../models/inventory.model.js";

import ApiError from "../utils/ApiError.js";

import type {
  BranchSalesDto,
  PaymentInsightDto,
  StoreOverviewDto,
  TimeSeriesPointDto,
  BranchPerformanceDto,
  TimeSeriesDataDto,
  StoreAlertDto,
  TodaySalesByBranchDto,
} from "../types/storeAnalytics.types.js";
import type { CategorySalesDto } from "../types/branchAnalytics.types.js";

export const getStoreOverviewService = async (
  storeId: string
): Promise<StoreOverviewDto> => {
  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid store ID",
    });
  }

  const store = await Store.findOne({
    _id: storeId,
  });

  console.log("store", store);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const [totalBranches, totalProducts, totalOrders, totalRefunds] = await Promise.all([
    Branch.countDocuments({
      store: store._id,
    }),

    Product.countDocuments({
      store: store._id,
    }),

    Order.countDocuments({
      branch: {
        $in: branchIds,
      },
    }),

    Refund.countDocuments({
      branch: {
        $in: branchIds,
      },
    }),
  ]);

  const totalCustomers = (
    await Customer.distinct("_id", {
      branch: {
        $in: branchIds,
      },
    })
  ).length;

  const totalEmployees = await User.countDocuments({
    store: store._id,
    role: {
      $in: [
        "ROLE_STORE_ADMIN",
        "ROLE_STORE_MANAGER",
        "ROLE_BRANCH_MANAGER",
        "ROLE_BRANCH_ADMIN",
        "ROLE_BRANCH_CASHIER",
      ],
    },
  });

  const salesResult = await Order.aggregate([
    {
      $match: {
        branch: {
          $in: await Branch.find({
            store: store._id,
          }).distinct("_id"),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  const totalSales = salesResult[0]?.totalSales ?? 0;

  const topBranchResult = await Order.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchInfo",
      },
    },

    {
      $unwind: "$branchInfo",
    },

    {
      $match: {
        "branchInfo.store": store._id,
      },
    },

    {
      $group: {
        _id: "$branchInfo._id",
        branchName: {
          $first: "$branchInfo.name",
        },
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $sort: {
        totalSales: -1,
      },
    },

    {
      $limit: 1,
    },
  ]);

  const topBranchName = topBranchResult.length > 0 ? topBranchResult[0].branchName : null;

  return {
    totalBranches,
    totalSales,
    totalOrders,
    totalEmployees,
    totalCustomers,
    totalRefunds,
    totalProducts,
    topBranchName,
  };
};

export const getDailySalesGraphService = async (
  storeId: string
): Promise<TimeSeriesPointDto[]> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const endDate = new Date();

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - 6);

  const orders = await Order.find({
    branch: {
      $in: branchIds,
    },
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate("branch", "name");

  const grouped = new Map<
    string,
    {
      date: string;
      branchName: string;
      totalAmount: number;
    }
  >();

  orders.forEach((order) => {
    const branch = order.branch as unknown as {
      _id: string;
      name: string;
    };

    const date = order.createdAt!.toISOString().slice(0, 10);

    const key = `${date}-${branch.name}`;

    const existing = grouped.get(key);

    if (existing) {
      existing.totalAmount += order.totalAmount;
    } else {
      grouped.set(key, {
        date,
        branchName: branch.name,
        totalAmount: order.totalAmount,
      });
    }
  });

  return [...grouped.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item) => ({
      date: new Date(item.date),
      totalAmount: item.totalAmount,
      branchName: item.branchName,
    }));
};

export const getMonthlySalesGraphService = async (
  storeId: string
): Promise<TimeSeriesPointDto[]> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const endDate = new Date();

  const startDate = new Date();

  startDate.setFullYear(startDate.getFullYear() - 1);

  const orders = await Order.find({
    branch: {
      $in: branchIds,
    },
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }).populate("branch", "name");

  const grouped = new Map<
    string,
    {
      month: string;
      branchName: string;
      totalAmount: number;
    }
  >();

  orders.forEach((order) => {
    const branch = order.branch as unknown as {
      name: string;
    };

    const date = order.createdAt!;

    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

    const key = `${month}-${branch.name}`;

    const existing = grouped.get(key);

    if (existing) {
      existing.totalAmount += order.totalAmount;
    } else {
      grouped.set(key, {
        month,
        branchName: branch.name,
        totalAmount: order.totalAmount,
      });
    }
  });

  return [...grouped.values()]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((item) => ({
      date: new Date(`${item.month}-01`),
      totalAmount: item.totalAmount,
      branchName: item.branchName,
    }));
};

export const getSalesByCategoryService = async (
  storeId: string
): Promise<CategorySalesDto[]> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const result = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "products",
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
      $match: {
        "product.store": store._id,
      },
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
        _id: "$category.name",

        totalSales: {
          $sum: {
            $multiply: ["$items.quantity", "$items.price"],
          },
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
    categoryId: item.categoryId,
    categoryName: item._id,
    totalSales: item.totalSales,
    quantitySold: item.quantitySold,
  }));
};

export const getSalesByPaymentMethodService = async (
  storeId: string
): Promise<PaymentInsightDto[]> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const result = await Order.aggregate([
    {
      $match: {
        branch: {
          $in: branchIds,
        },
      },
    },

    {
      $group: {
        _id: "$paymentType",

        totalAmount: {
          $sum: "$totalAmount",
        },
      },
    },

    {
      $sort: {
        totalAmount: -1,
      },
    },
  ]);

  return result.map((item) => ({
    paymentMethod: item._id,
    totalAmount: item.totalAmount,
  }));
};

export const getSalesByBranchService = async (
  storeId: string
): Promise<BranchSalesDto[]> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const result = await Order.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchInfo",
      },
    },

    {
      $unwind: "$branchInfo",
    },

    {
      $match: {
        "branchInfo.store": store._id,
      },
    },

    {
      $group: {
        _id: "$branchInfo.name",

        totalSales: {
          $sum: "$totalAmount",
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
    branchName: item._id,
    totalSales: item.totalSales,
  }));
};

export const getSalesTrendsService = async (
  storeId: string,
  period: "DAILY" | "WEEKLY" | "MONTHLY"
): Promise<TimeSeriesDataDto> => {
  let points: TimeSeriesPointDto[];

  switch (period.toUpperCase()) {
    case "MONTHLY":
      points = await getMonthlySalesGraphService(storeId);
      break;

    case "DAILY":
    case "WEEKLY":
    default:
      points = await getDailySalesGraphService(storeId);
      break;
  }

  return {
    period: period.toUpperCase() as "DAILY" | "WEEKLY" | "MONTHLY",
    points,
  };
};

export const getPaymentBreakdownService = async (
  storeId: string
): Promise<PaymentInsightDto[]> => {
  return getSalesByPaymentMethodService(storeId);
};

export const getBranchPerformanceService = async (
  storeId: string
): Promise<BranchPerformanceDto> => {
  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchSales = await getSalesByBranchService(storeId);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const newBranchesThisMonth = await Branch.countDocuments({
    store: store._id,
    createdAt: {
      $gte: startOfMonth,
    },
  });

  const topBranch = branchSales.at(0)?.branchName ?? null;

  return {
    branchSales,
    newBranchesThisMonth,
    topBranch,
  };
};

export const getStoreAlertsService = async (storeId: string): Promise<StoreAlertDto> => {
  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid store ID",
    });
  }

  const store = await Store.findOne({
    _id: storeId,
  });

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  /**
   * Low Stock Products
   */
  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const lowStockAlerts = await Inventory.find({
    branch: {
      $in: branchIds,
    },
    quantity: {
      $lte: 5,
    },
  })
    .populate({
      path: "branch",
      select: "name",
    })
    .populate({
      path: "product",
      match: {
        store: store._id,
      },
      select: "name sku sellingPrice image",
    })
    .lean();

  const filteredLowStockAlerts = lowStockAlerts
    .filter((inventory: any) => inventory.product)
    .map((inventory: any) => ({
      _id: inventory.branch._id,

      branchName: inventory.branch.name,

      product: {
        _id: inventory.product._id,

        name: inventory.product.name,

        sku: inventory.product.sku,

        sellingPrice: inventory.product.sellingPrice,

        image: inventory.product.image,

        quantity: inventory.quantity,
      },
    }));

  const lowStockCount = filteredLowStockAlerts.length;

  /**
   * Branches With No Sales Today
   */
  const branchIdsWithSales = await Order.distinct("branch", {
    branch: {
      $in: branchIds,
    },
    createdAt: {
      $gte: todayStart,
      $lte: todayEnd,
    },
  });

  const noSalesToday = await Branch.find({
    store: store._id,
    _id: {
      $nin: branchIdsWithSales,
    },
  })
    .select("name address phone email store manager")
    .lean();

  /**
   * Refund Spike Alerts
   * Total refunds > 5000 per day
   */
  const refundSpikeAlerts = await Refund.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchInfo",
      },
    },

    {
      $unwind: "$branchInfo",
    },

    {
      $match: {
        "branchInfo.store": store._id,
        createdAt: {
          $gte: sevenDaysAgo,
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

        totalRefundAmount: {
          $sum: "$amount",
        },

        refundCount: {
          $sum: 1,
        },

        refunds: {
          $push: {
            refundId: "$_id",
            orderId: "$order",
            amount: "$amount",
            reason: "$reason",
            paymentType: "$paymentType",
            branchName: "$branchInfo.name",
            createdAt: "$createdAt",
          },
        },
      },
    },

    {
      $match: {
        totalRefundAmount: {
          $gt: 5000,
        },
      },
    },
  ]);

  /**
   * Inactive Cashiers
   * No orders in last 7 days
   */
  const activeCashierIds = await Order.distinct("cashier", {
    branch: {
      $in: branchIds,
    },
    createdAt: {
      $gte: sevenDaysAgo,
    },
  });

  const inactiveCashiers = await User.find({
    store: store._id,
    role: "ROLE_BRANCH_CASHIER",
    _id: {
      $nin: activeCashierIds,
    },
  })
    .select("fullName email phone branch")
    .populate("branch", "name")
    .lean();

  return {
    lowStockCount,
    lowStockAlerts: filteredLowStockAlerts,

    noSalesToday,

    refundSpikeAlerts,

    inactiveCashiers,
  };
};

export const getTodaySalesByBranchService = async (
  storeId: string
): Promise<TodaySalesByBranchDto[]> => {
  if (!mongoose.Types.ObjectId.isValid(storeId)) {
    throw new ApiError({
      statusCode: 400,
      message: "Invalid store ID",
    });
  }

  const store = await Store.findById(storeId);

  if (!store) {
    throw new ApiError({
      statusCode: 404,
      message: "Store not found",
    });
  }

  const branchIds = await Branch.find({
    store: store._id,
  }).distinct("_id");

  const todayStart = new Date();

  todayStart.setHours(0, 0, 0, 0);

  const result = await Order.aggregate([
    {
      $match: {
        branch: {
          $in: branchIds,
        },
        createdAt: {
          $gte: todayStart,
          $lte: new Date(),
        },
      },
    },
    {
      $lookup: {
        from: "branches",
        localField: "branch",
        foreignField: "_id",
        as: "branchInfo",
      },
    },
    {
      $unwind: "$branchInfo",
    },
    {
      $group: {
        _id: "$branchInfo.name",

        totalSales: {
          $sum: "$totalAmount",
        },

        totalOrders: {
          $sum: 1,
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
    branchName: item._id,
    totalSales: item.totalSales,
    totalOrders: item.totalOrders,
  }));
};
