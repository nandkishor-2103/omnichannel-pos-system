import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type SalesData = {
  name: string;
  sales: number;
};

const data: SalesData[] = [
  { name: "01 May", sales: 1200 },
  { name: "02 May", sales: 2100 },
  { name: "03 May", sales: 800 },
  { name: "04 May", sales: 1600 },
  { name: "05 May", sales: 2400 },
  { name: "06 May", sales: 3000 },
  { name: "07 May", sales: 1800 },
];

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
  return (
    <Card className="border border-border/50 shadow-sm rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Daily Sales
            </CardTitle>

            <p className="text-sm text-muted-foreground mt-1">
              Last 7 days sales overview
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={42}>
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
                tickFormatter={(value) => `₹${value}`}
                className="text-muted-foreground"
              />

              <ChartTooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => [`₹${value}`, "Sales"]}
                  />
                )}
              />

              <Bar dataKey="sales" radius={[10, 10, 0, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {/* {analytics?.loading && (
          <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>
        )} */}
      </CardContent>
    </Card>
  );
}
