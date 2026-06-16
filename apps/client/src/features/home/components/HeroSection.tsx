import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import DashboardPreview from "@/assets/dashboard-preview.png";

export default function HeroSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <span className="rounded-full border px-4 py-2 text-sm">
          🚀 Modern POS Platform
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
          Manage Your Entire Retail Business
          <span className="block text-primary">From One Dashboard</span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Inventory, sales, billing, customers, employees, branches, subscriptions and
          analytics — everything you need to run a successful retail business.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/signup">Start Free Trial</Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>

        <div className="mt-16 rounded-3xl border bg-muted/30 p-10 shadow-sm">
          <img
            src={DashboardPreview}
            alt="POS Dashboard"
            className="w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
