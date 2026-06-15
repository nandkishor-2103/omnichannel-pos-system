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
  Cell,
} from "recharts";

type Props = {
  data: {
    categoryName: string;
    totalSales: number;
    selected?: boolean;
  }[];
};

export default function CategorySalesChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Performance</CardTitle>

        <CardDescription>Top performing product categories by revenue</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            totalSales: {
              label: "Sales",
            },
          }}
          className="h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{
                top: 10,
                // right: 20,
                left: 20,
                // bottom: 0,
              }}
            >
              <CartesianGrid horizontal={false} />

              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
              />

              <YAxis
                type="category"
                dataKey="categoryName"
                tickLine={false}
                axisLine={false}
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                  />
                }
              />

              <Bar dataKey="totalSales" barSize={30} radius={[0, 8, 8, 0]}>
                {data.map((entry) => (
                  <Cell
                    key={entry.categoryName}
                    fill={entry.selected ? "#22c55e" : "#3b82f6"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
