import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Pie, PieChart, Cell, ResponsiveContainer, Label } from "recharts";

const chartConfig = {
  UPI: {
    color: "#22c55e",
  },

  CARD: {
    color: "#3b82f6",
  },

  CASH: {
    color: "#f59e0b",
  },
};

type Props = {
  data: {
    method: string;
    amount: number;
  }[];
};

export default function PaymentMethodChart({ data }: Props) {
  const totalSales = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales by Payment Method</CardTitle>

        <CardDescription>Revenue distribution by payment type</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="method"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={3}
              >
                {data.map((item) => (
                  <Cell
                    key={item.method}
                    fill={chartConfig[item.method as keyof typeof chartConfig]?.color}
                  />
                ))}

                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox)) {
                      return null;
                    }

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          className="fill-foreground text-xl font-bold"
                        >
                          ₹{Math.round(totalSales).toLocaleString("en-IN")}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          dy="22"
                          className="fill-muted-foreground text-sm"
                        >
                          Total Sales
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                  />
                }
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          {data.map((item) => (
            <div key={item.method} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    chartConfig[item.method as keyof typeof chartConfig]?.color,
                }}
              />

              <span className="text-sm font-medium">{item.method}</span>

              <span className="text-sm text-muted-foreground">
                ₹{item.amount.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
