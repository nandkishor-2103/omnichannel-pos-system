import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent } from "@/components/ui/card";

import {
  Store,
  TrendingUp,
  Clock,
  ShieldX,
  Ban,
} from "lucide-react";

export default function SuperAdminOverview() {
  const stores = useAppSelector((state) => state.store.stores);

  const totalStores = useMemo(() => stores.length, [stores]);

  const activeStores = useMemo(
    () => stores.filter((store) => store.status === "ACTIVE").length,
    [stores]
  );

  const pendingStores = useMemo(
    () => stores.filter((store) => store.status === "PENDING").length,
    [stores]
  );

  const blockedStores = useMemo(
    () => stores.filter((store) => store.status === "BLOCKED").length,
    [stores]
  );

  const inactiveStores = useMemo(
    () => stores.filter((store) => store.status === "INACTIVE").length,
    [stores]
  );

  const storeOverview = [
    {
      title: "Total Stores",
      value: totalStores,
      icon: <Store className="h-6 w-6 text-blue-500" />,
      description: "Registered stores",
    },
    {
      title: "Active Stores",
      value: activeStores,
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      description: "Currently operational",
    },
    {
      title: "Pending Approval",
      value: pendingStores,
      icon: <Clock className="h-6 w-6 text-orange-500" />,
      description: "Awaiting review",
    },
    {
      title: "Blocked Stores",
      value: blockedStores,
      icon: <ShieldX className="h-6 w-6 text-red-500" />,
      description: "Suspended stores",
    },
    {
      title: "Inactive Stores",
      value: inactiveStores,
      icon: <Ban className="h-6 w-6 text-slate-500" />,
      description: "Temporarily inactive",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {storeOverview.map((item) => (
        <Card
          key={item.title}
          className="border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {item.value}
                </h2>

                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                {item.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
