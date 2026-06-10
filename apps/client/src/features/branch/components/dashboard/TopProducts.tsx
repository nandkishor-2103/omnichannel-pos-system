import { getTopProductsByQuantity } from "@/app/store/branchAnalytics/branchAnalyticsThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect } from "react";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#a855f7", // purple
  "#ef4444", // red
  "#06b6d4", // cyan
  "#f97316", // orange
  "#84cc16", // lime
];

export default function TopProducts() {
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);

  const topProductPerformance = useAppSelector(
    (state) => state.branchAnalytics.topProducts
  );
  const data = topProductPerformance.map((product) => ({
    name: product.productName,
    value: product.quantitySold,
    percentage: product.percentage,
    quantity: product.quantitySold,
  }));

  const config = data.reduce<Record<string, { label: string; color: string }>>(
    (acc, item, index) => {
      acc[item.name] = {
        label: item.name,
        color: COLORS[index % COLORS.length],
      };

      return acc;
    },
    {}
  );

  useEffect(() => {
    if (branch?._id) {
      dispatch(getTopProductsByQuantity(branch._id));
    }
  }, [dispatch, branch?._id]);
  return (
    <Card className="rounded-2xl border border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Product Performance
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Top selling products overview
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[320px] w-full">
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={4}
              strokeWidth={0}
              label={({ name, percentage }) => `${name} ${percentage}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <ChartTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const item = payload[0].payload;

                return (
                  <div className="rounded-lg border bg-background p-3 shadow-lg">
                    <p className="font-semibold">{item.name}</p>

                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        Quantity Sold:{" "}
                        <span className="font-medium">{item.quantity}</span>
                      </p>

                      <p>
                        Market Share:{" "}
                        <span className="font-medium">{item.percentage}%</span>
                      </p>
                    </div>
                  </div>
                );
              }}
            />

            <ChartLegend
              verticalAlign="bottom"
              content={({ payload }) => (
                <ChartLegendContent
                  payload={payload}
                  className="mt-6 text-sm [&_*]:text-base [&_*]:font-medium [&_svg]:h-4 [&_svg]:w-4"
                />
              )}
            />
          </PieChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
