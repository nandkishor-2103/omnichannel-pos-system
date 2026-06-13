import { useEffect, useMemo, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Check, ChevronsUpDown } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getSalesTrends } from "@/app/store/storeAnalytics/storeAnalyticsThunk";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
};

export default function SalesTrends() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const dailySalesTrends = useAppSelector((state) => state.storeAnalytics.dailySales);

  const [open, setOpen] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState("ALL");

  useEffect(() => {
    if (user?.store?.id) {
      dispatch(
        getSalesTrends({
          storeId: user.store.id,
          period: "DAILY",
        })
      );
    }
  }, [dispatch, user?.store?.id]);

  const branches = useMemo(
    () => ["ALL", ...new Set(dailySalesTrends.map((item) => item.branchName))],
    [dailySalesTrends]
  );

  const chartData =
    selectedBranch === "ALL"
      ? Object.values(
          dailySalesTrends.reduce(
            (acc, item) => {
              const date = new Date(item.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              });

              if (!acc[date]) {
                acc[date] = {
                  date,
                  sales: 0,
                  branchName: "All Branches",
                };
              }

              acc[date].sales += item.sales;

              return acc;
            },
            {} as Record<
              string,
              {
                date: string;
                sales: number;
                branchName: string;
              }
            >
          )
        )
      : dailySalesTrends
          .filter((item) => item.branchName === selectedBranch)
          .map((item) => ({
            date: new Date(item.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            }),
            sales: item.sales,
            branchName: item.branchName,
          }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-medium">Sales Trends (Last 7 Days)</CardTitle>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[250px] justify-between"
            >
              {selectedBranch === "ALL" ? "All Branches" : selectedBranch}

              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search branch..." />

              <CommandEmpty>No branch found.</CommandEmpty>

              <CommandGroup>
                {branches.map((branch) => (
                  <CommandItem
                    key={branch}
                    value={branch}
                    onSelect={(currentValue) => {
                      setSelectedBranch(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedBranch === branch ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {branch === "ALL" ? "All Branches" : branch}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[320px] w-full">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />

            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0].payload as {
                  sales: number;
                  branchName: string;
                  date: string;
                };

                return (
                  <div className="rounded-lg border bg-background p-3 shadow-md">
                    <p className="text-sm font-medium">{data.date}</p>

                    <p className="mt-2 text-lg font-bold">
                      ₹
                      {data.sales.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Branch: {data.branchName}
                    </p>
                  </div>
                );
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#10b981"
              strokeWidth={3}
              dot={{
                fill: "#10b981",
                r: 4,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ChartContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          Branch:{" "}
          <span className="font-medium text-foreground">
            {selectedBranch === "ALL" ? "All Branches" : selectedBranch}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
