import Store from "../models/store.model.js";

import type {
  DashboardSummaryDto,
  StoreRegistrationStatDto,
  StoreStatusDistributionDto,
} from "../types/adminDashboard.types.js";

// =========================================
// Dashboard Summary
// =========================================

export const getDashboardSummaryService = async (): Promise<DashboardSummaryDto> => {
  const [totalStores, activeStores, blockedStores, pendingStores] = await Promise.all([
    Store.countDocuments(),
    Store.countDocuments({ status: "ACTIVE" }),
    Store.countDocuments({ status: "BLOCKED" }),
    Store.countDocuments({ status: "PENDING" }),
  ]);

  return {
    totalStores,
    activeStores,
    blockedStores,
    pendingStores,
  };
};

// =========================================
// Last 7 Days Registration Stats
// =========================================

export const getStoreRegistrationStatsService = async (): Promise<
  StoreRegistrationStatDto[]
> => {
  const today = new Date();

  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(today.getDate() - 6);

  sevenDaysAgo.setHours(0, 0, 0, 0);

  const stats = await Store.aggregate([
    {
      $match: {
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

        count: {
          $sum: 1,
        },
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const resultMap = new Map<string, number>();

  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);

    date.setDate(sevenDaysAgo.getDate() + i);

    const formattedDate = date.toISOString().substring(0, 10);

    resultMap.set(formattedDate, 0);
  }

  stats.forEach((item) => {
    resultMap.set(item._id, item.count);
  });

  return Array.from(resultMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));
};

// =========================================
// Store Status Distribution
// =========================================

export const getStoreStatusDistributionService =
  async (): Promise<StoreStatusDistributionDto> => {
    const [active, blocked, pending] = await Promise.all([
      Store.countDocuments({ status: "ACTIVE" }),
      Store.countDocuments({ status: "BLOCKED" }),
      Store.countDocuments({ status: "PENDING" }),
    ]);

    return {
      active,
      blocked,
      pending,
    };
  };
