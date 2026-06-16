import {
  Boxes,
  Users,
  ShoppingBag,
  BarChart3,
  Building2,
  CreditCard,
} from "lucide-react";

const features = [
  {
    title: "Inventory Management",
    description: "Track stock in real-time.",
    icon: Boxes,
  },
  {
    title: "Sales & Billing",
    description: "Fast checkout experience.",
    icon: ShoppingBag,
  },
  {
    title: "Customer Management",
    description: "Maintain customer records.",
    icon: Users,
  },
  {
    title: "Advanced Reports",
    description: "Make smarter decisions.",
    icon: BarChart3,
  },
  {
    title: "Multi Branch Support",
    description: "Manage multiple branches.",
    icon: Building2,
  },
  {
    title: "Subscription Plans",
    description: "Flexible pricing model.",
    icon: CreditCard,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">Everything You Need</h2>

          <p className="mt-3 text-muted-foreground">
            Powerful tools to grow your business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>

                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
