import { DollarSign, ShoppingCart, Store, Users } from "lucide-react";
import type { StoreDashboardStats } from "../../types/dataTypes";
import { Card, CardContent } from "@/components/ui/card";

const loading = false;

const stats: StoreDashboardStats[] = [
  {
    title: "Total Sales",
    value: 4599,
    icon: <DollarSign className="w-8 h-8 text-emerald-500" />,
    change: 50,
    loading: loading,
  },
  {
    title: "Total Branches",
    value: 15,
    icon: <Store className="w-8 h-8 text-emerald-500" />,
    change: 4,
    loading: loading,
  },
  {
    title: "Total Products",
    value: 7899,
    icon: <ShoppingCart className="w-8 h-8 text-emerald-500" />,
    change: 40,
    loading: loading,
  },
  {
    title: "Total Employees",
    value: 300,
    icon: <Users className="w-8 h-8 text-emerald-500" />,
    change: 30,
    loading: loading,
  },
];

export default function DashboardState() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500"> {stat.title} </p>
                <h3 className="font-bold text-lg">{stat.value}</h3>
                <p
                  className={`text-xs font-medium mt-1 ${stat.change > 0 ? "text-emerald-500" : "text-red-500"}`}
                >
                  {stat.change < 0 ? `-${stat.change}` : `${stat.change}`}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-full">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
