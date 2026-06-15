import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: {
    date: string;
    sales: number;
  }[];
};

export default function DailySalesChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Sales Trend</CardTitle>

        <CardDescription>Sales performance over time</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
            },
          }}
          className="h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 60,
                left: 10,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />

                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                padding={{
                  left: 20,
                  right: 55,
                }}
              />

              <YAxis
                tickFormatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                tickLine={false}
                axisLine={false}
              />

              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const chartData = payload[0].payload;

                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="font-medium">{chartData.date}</div>

                      <div className="text-sm text-muted-foreground">
                        Branch: {chartData.branchName}
                      </div>

                      <div className="mt-1 font-semibold">
                        ₹{Number(chartData.sales).toLocaleString("en-IN")}
                      </div>
                    </div>
                  );
                }}
              />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#22c55e"
                fill="url(#salesGradient)"
                strokeWidth={3}
                activeDot={{
                  r: 6,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
