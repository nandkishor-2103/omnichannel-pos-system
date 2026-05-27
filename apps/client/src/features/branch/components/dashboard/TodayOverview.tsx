import { Card, CardContent } from "@/components/ui/card.tsx";
import { getChangeType } from "@/features/branch/components/dashboard/getChangeType.ts";
import {
  DollarSign,
  Package,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const todayOverview = {
  totalSales: 125000,
  salesGrowth: 5.2,
  ordersToday: 150,
  orderGrowth: 3.5,
  activeCashiers: 10,
  cashierGrowth: 2.1,
  lowStockItems: 5,
  lowStockGrowth: -1.2,
};

export default function TodayOverview() {
  const kpis = todayOverview
    ? [
        {
          title: "Today's Sales",
          value: `₹${todayOverview.totalSales?.toLocaleString() ?? "-"}`,
          icon: <DollarSign className="h-7 w-7 text-emerald-500" />,
          change:
            todayOverview.salesGrowth !== undefined
              ? `${todayOverview.salesGrowth > 0 ? "+" : ""}${todayOverview.salesGrowth.toFixed(2)}%`
              : "-",
          changeType: getChangeType(todayOverview.salesGrowth),
        },
        {
          title: "Orders Today",
          value: todayOverview.ordersToday ?? "-",
          icon: <ShoppingBag className="h-7 w-7 text-blue-500" />,
          change:
            todayOverview.orderGrowth !== undefined
              ? `${todayOverview.orderGrowth > 0 ? "+" : ""}${todayOverview.orderGrowth.toFixed(2)}%`
              : "-",
          changeType: getChangeType(todayOverview.orderGrowth),
        },
        {
          title: "Active Cashiers",
          value: todayOverview.activeCashiers ?? "-",
          icon: <Users className="h-7 w-7 text-violet-500" />,
          change:
            todayOverview.cashierGrowth !== undefined
              ? `${todayOverview.cashierGrowth > 0 ? "+" : ""}${todayOverview.cashierGrowth.toFixed(2)}%`
              : "-",
          changeType: getChangeType(todayOverview.cashierGrowth),
        },
        {
          title: "Low Stock Items",
          value: todayOverview.lowStockItems ?? "-",
          icon: <Package className="h-7 w-7 text-orange-500" />,
          change:
            todayOverview.lowStockGrowth !== undefined
              ? `${todayOverview.lowStockGrowth > 0 ? "+" : ""}${todayOverview.lowStockGrowth.toFixed(2)}%`
              : "-",
          changeType: getChangeType(todayOverview.lowStockGrowth),
        },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {
        kpis.length > 0 &&
          kpis.map((kpi, index) => (
            <Card
              key={index}
              className="
            border-border/50
            bg-card/80
            shadow-sm
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-xl
          "
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  {/* LEFT */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide text-muted-foreground">
                      {kpi.title}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {kpi.value}
                    </h2>

                    <div
                      className={`
                    inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold

                    ${
                      kpi.changeType === "positive"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : kpi.changeType === "negative"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-muted text-muted-foreground"
                    }
                  `}
                    >
                      {kpi.changeType === "positive" ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : kpi.changeType === "negative" ? (
                        <TrendingDown className="h-3.5 w-3.5" />
                      ) : null}

                      {kpi.change}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div
                    className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl border border-border/50
                  bg-muted/40 shadow-sm
                "
                  >
                    {kpi.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          )) /*:  (
        <div className="col-span-4 text-center text-gray-400">
          {loading ? "Loading KPIs..." : "No data available"}
        </div>
      ) */
      }
    </div>
  );
}
