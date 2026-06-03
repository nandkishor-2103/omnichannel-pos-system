import { Card, CardContent } from "@/components/ui/card";
import { Clock, Store, TrendingUp, TriangleAlert } from "lucide-react";

const overview = {
  totalStores: 78,
  activeStores: 50,
  pendingStores: 18,
  blockedStores: 10,
};

export default function SuperAdminOverview() {
  const storeOverview = [
    {
      title: "Total Stores",
      value: overview.totalStores,
      icon: <Store className="h-7 w-7 text-blue-500" />,
      description: "Registered stores",
    },
    {
      title: "Active Stores",
      value: overview.activeStores,
      icon: <TrendingUp className="h-7 w-7 text-green-500" />,
      description: "Currently operational",
    },
    {
      title: "Pending Approval",
      value: overview.pendingStores,
      icon: <Clock className="h-7 w-7 text-orange-500" />,
      description: "Awaiting verification",
    },
    {
      title: "Blocked Stores",
      value: overview.blockedStores,
      icon: <TriangleAlert className="h-7 w-7 text-red-500" />,
      description: "Suspended accounts",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {storeOverview.map((item) => (
        <Card
          key={item.title}
          className="border shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>

                <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
