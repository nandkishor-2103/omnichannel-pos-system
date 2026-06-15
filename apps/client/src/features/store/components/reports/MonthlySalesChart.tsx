import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: {
    month: string;
    sales: number;
  }[];
};

export default function MonthlySalesChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>

        <CardDescription>Revenue performance by month</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                padding={{
                  left: 20,
                  right: 20,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
              />

              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;

                  const data = payload[0].payload;

                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-md">
                      <div className="font-medium">{data.month}</div>

                      <div className="text-sm text-muted-foreground">
                        Branch: {data.branchName}
                      </div>

                      <div className="mt-1 font-semibold">
                        ₹{data.sales.toLocaleString("en-IN")}
                      </div>
                    </div>
                  );
                }}
              />

              <Bar dataKey="sales" barSize={50} radius={[8, 8, 0, 0]} fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
