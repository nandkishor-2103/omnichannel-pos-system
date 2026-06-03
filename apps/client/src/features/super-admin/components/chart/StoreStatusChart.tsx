import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Active",
    value: 50,
    percentage: 57,
  },
  {
    name: "Pending",
    value: 18,
    percentage: 21,
  },
  {
    name: "Blocked",
    value: 10,
    percentage: 11,
  },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const config = data.reduce<Record<string, { label: string; color: string }>>(
  (acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: COLORS[index],
    };

    return acc;
  },
  {}
);

export default function StoreStatusChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Store Status Overview</CardTitle>

        <p className="text-sm text-muted-foreground">
          Distribution of stores by current status
        </p>
      </CardHeader>

      <CardContent>
        <ChartContainer config={config} className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
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
                  <Cell key={index} fill={COLORS[index]} />
                ))}
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
