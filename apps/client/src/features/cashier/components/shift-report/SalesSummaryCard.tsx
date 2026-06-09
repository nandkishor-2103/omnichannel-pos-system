import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent } from "@/components/ui/card";

export default function SalesSummaryCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);
  console.log(currentShift)

  const totalSales = currentShift?.totalSales ?? 0;
  const totalRefunds = currentShift?.totalRefunds ?? 0;
  const netSales = currentShift?.netSales ?? 0;
  const totalOrders = currentShift?.totalOrders ?? 0;

  const isProfit = netSales >= 0;

  const refundPercentage =
    totalSales > 0 ? ((totalRefunds / totalSales) * 100).toFixed(1) : "0";

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Sales Summary</h2>

            <p className="text-xs text-muted-foreground">
              Today's sales performance overview
            </p>
          </div>

          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {totalOrders} Orders
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-3">
          {/* Total Sales */}
          <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Sales</p>

              <h3 className="text-lg font-bold text-green-700">
                ₹ {totalSales.toFixed(2)}
              </h3>
            </div>

            <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              Income
            </div>
          </div>

          {/* Refunds */}
          <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Refunds</p>

              <h3 className="text-lg font-bold text-red-500">
                - ₹ {totalRefunds.toFixed(2)}
              </h3>
            </div>

            <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              {refundPercentage}% Refunds
            </div>
          </div>

          {/* Net Sales */}
          <div className="flex items-center justify-between rounded-xl border bg-primary/5 px-4 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Net Sales</p>

              <h3
                className={`text-xl font-bold ${
                  isProfit ? "text-primary" : "text-red-500"
                }`}
              >
                ₹ {netSales.toFixed(2)}
              </h3>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                isProfit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
              }`}
            >
              {isProfit ? "Profit" : "Loss"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
