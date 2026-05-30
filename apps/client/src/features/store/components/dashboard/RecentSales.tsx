import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { RecentSalesData } from "../../types/dataTypes";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Recent sales</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
            {
                recentSales.map((rSales) => (
                    <div key={rSales.branch} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium">{rSales.branch}</p>
                            <p className="text-sm text-gray-500">{rSales.date}</p>
                        </div>
                        <p className="font-semibold">{rSales.amount}</p>
                    </div>
                ))
            }
        </div>
      </CardContent>
    </Card>
  );
}
