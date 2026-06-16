import SubscriptionPlanCard from "./SubscriptionPlanCard";

import type { UpgradePlan } from "../types/upgradeTypes";

import type { StoreSubscription } from "@/app/store/store-subscription/storeSubscriptionTypes";

interface SubscriptionPlansGridProps {
  plans: UpgradePlan[];

  currentSubscription: StoreSubscription | null;

  onUpgrade: (plan: UpgradePlan) => void;

  loading?: boolean;
}

export default function SubscriptionPlansGrid({
  plans,
  currentSubscription,
  onUpgrade,
  loading = false,
}: SubscriptionPlansGridProps) {
  const currentPlanId = currentSubscription?.subscriptionPlan?._id;

  const activePlans = plans.filter((plan) => plan.status === "ACTIVE");

  if (!activePlans.length) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <h3 className="text-lg font-semibold">No Subscription Plans Available</h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Subscription plans will appear here once they are created by the administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {activePlans.map((plan) => (
        <SubscriptionPlanCard
          key={plan._id}
          plan={plan}
          isCurrentPlan={currentPlanId === plan._id}
          onUpgrade={onUpgrade}
          loading={loading}
        />
      ))}
    </div>
  );
}
