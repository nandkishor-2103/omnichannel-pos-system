import { CheckCircle, StarsIcon, Store, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: 499,
    billingCycle: "monthly",
    description: "Perfect for small retail stores and startups getting started with POS.",
    maxBranches: 1,
    maxUsers: 5,
    maxProducts: 1000,
    extraFeatures: [
      "Sales & inventory management",
      "Basic reporting dashboard",
      "Barcode support",
      "Customer management",
      "Email support",
    ],
  },
  {
    id: 2,
    name: "Growth",
    price: 1499,
    billingCycle: "monthly",
    description: "Designed for growing businesses managing multiple locations.",
    maxBranches: 10,
    maxUsers: 50,
    maxProducts: 10000,
    extraFeatures: [
      "Everything in Starter",
      "Multi-branch management",
      "Advanced inventory tracking",
      "Employee management",
      "Purchase & supplier management",
      "Priority support",
    ],
  },
  {
    id: 3,
    name: "Professional",
    price: 2999,
    billingCycle: "monthly",
    description:
      "Ideal for established businesses requiring advanced analytics and controls.",
    maxBranches: 50,
    maxUsers: 200,
    maxProducts: 50000,
    extraFeatures: [
      "Everything in Growth",
      "Advanced sales analytics",
      "Role-based access control",
      "Custom invoices & receipts",
      "API access",
      "WhatsApp & SMS integrations",
      "Dedicated account manager",
    ],
  },
];

const currentSubscription = {
  plan: {
    id: 1,
    name: "Starter",
  },
  status: "Active",
  validUntil: "09 Aug 2026",
};

export default function Upgrade() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Upgrade Your Subscription</h1>
        <p className="text-muted-foreground mt-2">
          Choose the perfect plan for your business growth
        </p>
      </div>

      {/* Current Plan */}
      <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />

          <div>
            <h2 className="font-semibold text-green-900">
              Current Plan: {currentSubscription.plan.name}
            </h2>

            <p className="text-sm text-green-700">
              {currentSubscription.status} Subscription
            </p>

            <p className="text-sm text-green-700">
              Valid Until: {currentSubscription.validUntil}
            </p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentSubscription.plan.id === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg flex flex-col ${
                isCurrentPlan ? "border-green-500 ring-2 ring-green-500/20" : ""
              }`}
            >
              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-medium text-white">
                    Current Plan
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>

                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>

                  <span className="text-muted-foreground text-sm ml-1">
                    /{plan.billingCycle}
                  </span>
                </div>

                <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Limits */}
              <div className="my-6 border-y py-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Branches
                  </span>

                  <span className="font-medium">{plan.maxBranches}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4" />
                    Users
                  </span>

                  <span className="font-medium">{plan.maxUsers}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <StarsIcon className="h-4 w-4" />
                    Products
                  </span>

                  <span className="font-medium">{plan.maxProducts}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex-1">
                <h4 className="font-semibold mb-3">Included Features</h4>

                <ul className="space-y-2">
                  {plan.extraFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button
                className="mt-6 w-full cursor-pointer"
                variant={isCurrentPlan ? "secondary" : "default"}
                disabled={isCurrentPlan}
              >
                {isCurrentPlan ? "Current Plan" : "Upgrade Plan"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
