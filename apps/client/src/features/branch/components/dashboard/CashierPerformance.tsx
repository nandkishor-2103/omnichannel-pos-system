import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Trophy } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";
import { getTopCashiersByRevenue } from "@/app/store/branchAnalytics/branchAnalyticsThunk";

const colors = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444"];

const config = {
  sales: {
    label: "Sales",
    color: "#10b981",
  },
};

export default function CashierPerformance() {
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);
  const topCashierByRevenue = useAppSelector(
    (state) => state.branchAnalytics.topCashiers
  );

  useEffect(() => {
    if (branch?._id) {
      dispatch(getTopCashiersByRevenue(branch._id));
    }
  }, [dispatch, branch?._id]);

  const data = topCashierByRevenue.map((topCashier, index) => ({
    name: topCashier.cashierName.split(" ")[0], // First name only
    fullName: topCashier.cashierName, // Keep full name for tooltip
    sales: topCashier.totalRevenue,
    orders: topCashier.totalOrders,
    color: colors[index % colors.length],
  }));

  return (
    <Card className="rounded-2xl border border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">
            Cashier Performance
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">Top performing cashiers</p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1">
          <Trophy className="h-4 w-4 text-emerald-500" />

          <span className="text-xs font-medium text-emerald-600">Top {data.length}</span>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart
            data={data.slice(0, 5)}
            layout="vertical"
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              fontSize={13}
              width={70}
            />

            <ChartTooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const item = payload[0].payload;

                return (
                  <div className="rounded-lg border bg-background p-3 shadow-lg">
                    <p>
                      Name:{" "} <span className="font-medium">{item.fullName}</span>
                    </p>

                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        Revenue:{" "}
                        <span className="font-medium">
                          ₹{item.sales.toLocaleString("en-IN")}
                        </span>
                      </p>

                      <p>
                        Orders: <span className="font-medium">{item.orders}</span>
                      </p>
                    </div>
                  </div>
                );
              }}
            />

            <Bar dataKey="sales" radius={[0, 10, 10, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
        {/* {loading && (
          <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>
        )} */}
      </CardContent>
    </Card>
  );
}
