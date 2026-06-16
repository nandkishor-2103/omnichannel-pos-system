import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₹999",
  },
  {
    name: "Professional",
    price: "₹1999",
  },
  {
    name: "Enterprise",
    price: "Custom",
  },
];

export default function PricingPreview() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">Simple Pricing</h2>

          <p className="mt-3 text-muted-foreground">
            Choose the plan that fits your business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-2xl border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-semibold">{plan.name}</h3>

              <p className="mt-4 text-4xl font-bold">{plan.price}</p>

              <ul className="mt-6 space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Unlimited Products
                </li>

                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Sales Management
                </li>

                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Reports
                </li>
              </ul>

              <Button className="mt-8 w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
