import { Card, CardContent } from "@/components/ui/card";

type salesSummaryData = {
  totalOrders: number;
  totalSales: number;
  totalRefunds: number;
  netSales: number;
};

const salesSummaryData: salesSummaryData = {
  totalOrders: 59,
  totalSales: 10000,
  totalRefunds: 1000,
  netSales: 9000,
};

export default function SalesSummaryCard() {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-4">
        {/* Dynamic Values */}
        {(() => {
          const isProfit = salesSummaryData.netSales >= 0;

          const refundPercentage =
            salesSummaryData.totalSales > 0
              ? (
                  (salesSummaryData.totalRefunds / salesSummaryData.totalSales) *
                  100
                ).toFixed(1)
              : "0";

          return (
            <>
              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Sales Summary</h2>

                  <p className="text-xs text-muted-foreground">
                    Today's sales performance overview
                  </p>
                </div>

                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {salesSummaryData.totalOrders} Orders
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3">
                {/* Total Sales */}
                <div className="flex items-center justify-between rounded-xl border bg-background px-4 py-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sales</p>

                    <h3 className="text-lg font-bold text-green-700">
                      ₹ {salesSummaryData.totalSales.toFixed(2)}
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
                      - ₹ {salesSummaryData.totalRefunds.toFixed(2)}
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
                      className={`
                    text-xl
                    font-bold
                    ${isProfit ? "text-primary" : "text-red-500"}
                  `}
                    >
                      ₹ {salesSummaryData.netSales.toFixed(2)}
                    </h3>
                  </div>

                  <div
                    className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-medium
                  ${isProfit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}
                `}
                  >
                    {isProfit ? "Profit" : "Loss"}
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </CardContent>
    </Card>
  );
}
