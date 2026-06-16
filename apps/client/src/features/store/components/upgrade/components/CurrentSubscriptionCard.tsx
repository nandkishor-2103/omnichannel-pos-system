import { Badge } from "@/components/ui/badge";

import { CalendarDays, Crown, Clock3, CheckCircle2 } from "lucide-react";

import type { StoreSubscription } from "@/app/store/store-subscription/storeSubscriptionTypes";

interface CurrentSubscriptionCardProps {
  subscription: StoreSubscription | null;
}

export default function CurrentSubscriptionCard({
  subscription,
}: CurrentSubscriptionCardProps) {
  if (!subscription) {
    return (
      <div className="rounded-xl border border-dashed p-6 text-center">
        <h3 className="text-lg font-semibold">No Active Subscription</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose a subscription plan below to activate your store subscription.
        </p>
      </div>
    );
  }

  const startDate = new Date(subscription.startDate);

  const endDate = new Date(subscription.endDate);

  const today = new Date();

  const remainingDays = Math.max(
    0,
    Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  const isExpired = endDate < today;

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />

            <h2 className="text-xl font-bold">{subscription.subscriptionPlan.name}</h2>

            <Badge variant={subscription.status === "ACTIVE" ? "default" : "destructive"}>
              {subscription.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Current active subscription for your store
          </p>
        </div>

        {/* Right Section */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Started On</p>

              <p className="text-sm font-medium">{startDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Expires On</p>

              <p className="text-sm font-medium">{endDate.toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-muted-foreground" />

            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>

              <p className="text-sm font-medium">
                {isExpired ? "Expired" : `${remainingDays} Days`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
