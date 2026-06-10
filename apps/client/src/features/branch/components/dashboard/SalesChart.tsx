import { getDailySalesChart } from "@/app/store/branchAnalytics/branchAnalyticsThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { useEffect } from "react";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

type SalesData = {
  name: string;
  sales: number;
};

const barColors = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#10b981",
  },
};

export default function SalesChart() {
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);

  const dailySales = useAppSelector((state) => state.branchAnalytics.dailySales);

  useEffect(() => {
    if (branch?._id) {
      dispatch(getDailySalesChart({ branchId: branch._id }));
    }
  }, [dispatch, branch?._id]);

  const chartData: SalesData[] = dailySales.map((item) => ({
    name: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    sales: item.totalSales,
  }));

  return (
    <Card className="rounded-2xl border border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Daily Sales
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Last 7 days sales overview
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <BarChart data={chartData} barSize={42}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              className="stroke-muted/40"
            />

            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              className="text-muted-foreground"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => `₹${value.toLocaleString()}`}
              className="text-muted-foreground"
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={({ active, payload }) => (
                <ChartTooltipContent
                  active={active}
                  payload={payload}
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}`,
                    " Sales",
                  ]}
                />
              )}
            />

            <Bar dataKey="sales" radius={[10, 10, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
