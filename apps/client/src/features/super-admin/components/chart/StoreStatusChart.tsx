import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export default function StoreStatusChart() {
  const stores = useAppSelector((state) => state.store.stores);

  const chartData = useMemo(() => {
    const activeCount = stores.filter((store) => store.status === "ACTIVE").length;

    const pendingCount = stores.filter((store) => store.status === "PENDING").length;

    const blockedCount = stores.filter((store) => store.status === "BLOCKED").length;

    const total = activeCount + pendingCount + blockedCount;

    return [
      {
        name: "Active",
        value: activeCount,
        percentage: total > 0 ? Math.round((activeCount / total) * 100) : 0,
      },
      {
        name: "Pending",
        value: pendingCount,
        percentage: total > 0 ? Math.round((pendingCount / total) * 100) : 0,
      },
      {
        name: "Blocked",
        value: blockedCount,
        percentage: total > 0 ? Math.round((blockedCount / total) * 100) : 0,
      },
    ];
  }, [stores]);

  const chartConfig = useMemo(() => {
    return {
      Active: {
        label: "Active",
        color: COLORS[0],
      },
      Pending: {
        label: "Pending",
        color: COLORS[1],
      },
      Blocked: {
        label: "Blocked",
        color: COLORS[2],
      },
    };
  }, []);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Store Status Overview</CardTitle>

        <p className="text-sm text-muted-foreground">
          Distribution of stores by current status
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                strokeWidth={0}
                label={false}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}

                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) {
                      return null;
                    }

                    const cx = viewBox.cx ?? 0;
                    const cy = viewBox.cy ?? 0;

                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan
                          x={cx}
                          y={cy - 4}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {stores.length}
                        </tspan>

                        <tspan
                          x={cx}
                          y={cy + 22}
                          className="fill-muted-foreground text-sm"
                        >
                          Stores
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>

              <ChartTooltip
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => [`${value}`, " Stores"]}
                  />
                )}
              />

              <ChartLegend
                verticalAlign="bottom"
                content={({ payload }) => (
                  <ChartLegendContent
                    payload={payload}
                    className="mt-6 text-sm [&_*]:font-medium"
                  />
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
