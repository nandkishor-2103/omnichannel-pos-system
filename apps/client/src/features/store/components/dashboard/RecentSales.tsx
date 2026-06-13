import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { RecentSalesData } from "../../types/dataTypes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getTodaySalesByBranch } from "@/app/store/storeAnalytics/storeAnalyticsThunk";

const recentSales: RecentSalesData[] = [
  {
    branch: "Downtown Branch",
    amount: "₹12,500",
    date: "Today",
  },
  {
    branch: "Virar West Branch",
    amount: "₹8,750",
    date: "Today",
  },
  {
    branch: "Mumbai Central Branch",
    amount: "₹15,300",
    date: "Yesterday",
  },
  {
    branch: "Andheri East Branch",
    amount: "₹10,200",
    date: "Yesterday",
  },
];

export default function RecentSales() {
  const dispatch = useAppDispatch();

  const dailySales = useAppSelector((state) => state.storeAnalytics.todaySalesByBranch);

  const user = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    if (user?.store?.id) {
      dispatch(getTodaySalesByBranch(user.store.id));
    }
  }, [dispatch, user?.store?.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Today's Branch Sales</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {dailySales.length === 0 ? (
            <p className="text-sm text-muted-foreground">No sales found today</p>
          ) : (
            dailySales.map((sale) => (
              <div
                key={sale.branchName}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium">{sale.branchName}</p>

                  <p className="text-sm text-muted-foreground">
                    {sale.totalOrders} Orders
                  </p>
                </div>

                <p className="font-semibold">
                  ₹
                  {sale.totalSales.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
