import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart.tsx";

import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts";

import { Trophy } from "lucide-react";

type CashierPerformanceData = {
  name: string;
  sales: number;
  color: string;
};

const data: CashierPerformanceData[] = [
  {
    name: "John",
    sales: 95000,
    color: "#10b981",
  },
  {
    name: "Emma",
    sales: 82000,
    color: "#3b82f6",
  },
  {
    name: "Michael",
    sales: 76000,
    color: "#f59e0b",
  },
  {
    name: "Sophia",
    sales: 68000,
    color: "#8b5cf6",
  },
  {
    name: "David",
    sales: 54000,
    color: "#ef4444",
  },
  {
    name: "Olivia",
    sales: 43000,
    color: "#ec4899",
  }
];

const config = {
  sales: {
    label: "Sales",
    color: "#10b981",
  },
};

export default function CashierPerformance() {
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

          <span className="text-xs font-medium text-emerald-600">Top 5</span>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
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
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, " Sales"]}
                  />
                )}
              />

              <Bar dataKey="sales" radius={[0, 10, 10, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        {/* {loading && (
          <div className="text-center text-xs text-gray-400 mt-2">Loading...</div>
        )} */}
      </CardContent>
    </Card>
  );
}
