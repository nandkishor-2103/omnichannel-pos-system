import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type DataItem = {
  name: string;
  value: number;
  percentage: number;
};

const data: DataItem[] = [
  { name: "UPI", value: 50, percentage: 50 },
  { name: "CASH", value: 30, percentage: 30 },
  { name: "CARD", value: 20, percentage: 20 },
];

const COLORS: string[] = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6"];

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

export default function PaymentMethodsChart() {
  return (
    <Card className="rounded-2xl border border-border/50 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">
              Payment Method
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Top selling products overview
            </p>
          </div>
        </div>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <ChartTooltip
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    formatter={(value) => [`${value}%`, " Sales"]}
                  />
                )}
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
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
