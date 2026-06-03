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

const data = [
  { name: "Mon", stores: 5 },
  { name: "Tue", stores: 8 },
  { name: "Wed", stores: 12 },
  { name: "Thu", stores: 7 },
  { name: "Fri", stores: 15 },
  { name: "Sat", stores: 18 },
  { name: "Sun", stores: 10 },
];

const barColors = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#84cc16",
];

const chartConfig = {
  stores: {
    label: "Stores",
    color: "#3b82f6",
  },
};

export default function StoreRegistrationChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Store Registrations</CardTitle>

        <p className="text-sm text-muted-foreground">
          New stores registered during the last 7 days
        </p>
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

              <XAxis dataKey="name" tickLine={false} axisLine={false} />

              <YAxis tickLine={false} axisLine={false} />

              <ChartTooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => [`${value}`, " Stores"]}
                  />
                )}
              />

              <Bar dataKey="stores" radius={[10, 10, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={index} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
