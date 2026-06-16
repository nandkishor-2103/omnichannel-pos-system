import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks";

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
  const stores = useAppSelector((state) => state.store.stores);

  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, index) => {
      const date = new Date();

      date.setDate(date.getDate() - (6 - index));

      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });

      const dateString = date.toISOString().split("T")[0];

      const count = stores.filter((store) => {
        if (!store.createdAt) {
          return false;
        }

        return store.createdAt.startsWith(dateString);
      }).length;

      return {
        name: dayName,
        stores: count,
      };
    });

    return last7Days;
  }, [stores]);

  const totalRegistrations = useMemo(
    () => chartData.reduce((sum, day) => sum + day.stores, 0),
    [chartData]
  );

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Store Registrations</CardTitle>

        <p className="text-sm text-muted-foreground">
          {totalRegistrations} stores registered during the last 7 days
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={42}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                className="stroke-muted/40"
              />

              <XAxis dataKey="name" tickLine={false} axisLine={false} />

              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

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
                {chartData.map((_, index) => (
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
