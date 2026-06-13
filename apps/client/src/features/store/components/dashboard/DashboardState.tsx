import {
  DollarSign,
  ShoppingCart,
  Store,
  Users,
  RefreshCcw,
  Building2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useAppSelector } from "@/app/store/hooks";

import type { StoreDashboardStats } from "../../types/dataTypes";

export default function DashboardState() {
  const storeOverview = useAppSelector((state) => state.storeAnalytics.storeOverview);

  const stats: StoreDashboardStats[] = [
    {
      title: "Total Sales",
      value: storeOverview?.totalSales ?? 0,
      isCurrency: true,
      icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
    },
    // {
    //   title: "Total Orders",
    //   value: storeOverview?.totalOrders ?? 0,
    //   isCurrency: false,
    //   icon: <ShoppingCart className="w-8 h-8 text-emerald-500" />,
    // },
    {
      title: "Total Branches",
      value: storeOverview?.totalBranches ?? 0,
      isCurrency: false,
      icon: <Store className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Total Employees",
      value: storeOverview?.totalEmployees ?? 0,
      isCurrency: false,
      icon: <Users className="w-8 h-8 text-emerald-500" />,
    },
    // {
    //   title: "Total Customers",
    //   value: storeOverview?.totalCustomers ?? 0,
    //   isCurrency: false,
    //   icon: <Users className="w-8 h-8 text-emerald-500" />,
    // },
    {
      title: "Total Products",
      value: storeOverview?.totalProducts ?? 0,
      isCurrency: false,
      icon: <ShoppingCart className="w-8 h-8 text-emerald-500" />,
    },
    {
      title: "Total Refunds",
      value: storeOverview?.totalRefunds ?? 0,
      isCurrency: false,
      icon: <RefreshCcw className="w-8 h-8 text-emerald-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>

                <h3 className="mt-2 text-2xl font-bold">
                  {stat.isCurrency
                    ? `₹${stat.value.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : stat.value.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="rounded-full bg-emerald-50 p-3">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Top Branch Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Top Performing Branch
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {storeOverview?.topBranchName ?? "N/A"}
              </h3>
            </div>

            <div className="rounded-full bg-emerald-50 p-3">
              <Building2 className="w-8 h-8 text-emerald-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
