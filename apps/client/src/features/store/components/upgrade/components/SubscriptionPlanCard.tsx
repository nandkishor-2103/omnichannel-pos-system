import { Button } from "@/components/ui/button";

import { Store, Users, Package, CheckCircle, Crown } from "lucide-react";

import SubscriptionFeatureList from "./SubscriptionFeatureList";

import type { UpgradePlan } from "../types/upgradeTypes";

interface SubscriptionPlanCardProps {
  plan: UpgradePlan;

  isCurrentPlan: boolean;

  onUpgrade: (plan: UpgradePlan) => void;

  loading?: boolean;
}

export default function SubscriptionPlanCard({
  plan,
  isCurrentPlan,
  onUpgrade,
  loading = false,
}: SubscriptionPlanCardProps) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg ${
        isCurrentPlan ? "border-green-500 ring-2 ring-green-500/20" : ""
      }`}
    >
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
            <Crown className="h-3 w-3" />
            Current Plan
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-xl font-bold">{plan.name}</h3>

        <div className="mt-4">
          <span className="text-4xl font-bold">₹{plan.price.toLocaleString()}</span>

          <span className="ml-1 text-sm text-muted-foreground">
            /{plan.billingCycle === "MONTHLY" ? "month" : "year"}
          </span>
        </div>

        {plan.description && (
          <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
        )}
      </div>

      <div className="my-6 space-y-3 border-y py-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            Branches
          </span>

          <span className="font-medium">{plan.maxBranches}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </span>

          <span className="font-medium">{plan.maxUsers}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </span>

          <span className="font-medium">{plan.maxProducts}</span>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="mb-3 font-semibold">Included Features</h4>

        <div className="space-y-2">
          {plan.enableAdvancedReports && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Advanced Reports
            </div>
          )}

          {plan.enableInventory && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Inventory Management
            </div>
          )}

          {plan.enableIntegrations && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Integrations
            </div>
          )}

          {plan.enableEcommerce && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              E-Commerce Support
            </div>
          )}

          {plan.enableInvoiceBranding && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Invoice Branding
            </div>
          )}

          {plan.prioritySupport && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Priority Support
            </div>
          )}

          {plan.enableMultiLocation && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Multi Location
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <SubscriptionFeatureList features={plan.extraFeatures} />
      </div>

      <Button
        className="mt-6 w-full cursor-pointer"
        variant={isCurrentPlan ? "secondary" : "default"}
        disabled={isCurrentPlan || loading}
        onClick={() => onUpgrade(plan)}
      >
        {loading ? "Processing..." : isCurrentPlan ? "Current Plan" : "Upgrade Plan"}
      </Button>
    </div>
  );
}
