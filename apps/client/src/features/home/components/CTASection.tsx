import { ArrowRight, Store, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl border bg-primary text-primary-foreground shadow-xl">
          <div className="relative px-8 py-16 md:px-16 md:py-20">
            {/* Background Glow */}
            <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                🚀 Start Growing Today
              </span>

              <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
                Ready to Grow Your Business?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/80">
                Join retailers using POS Pro to manage inventory, sales, employees,
                customers, subscriptions, and multiple branches from one powerful
                platform.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="cursor-pointer">
                  <Link to="/signup">
                    <Store className="mr-2 h-5 w-5" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/contact-sales">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Sales
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/70">
                <span>✓ Free Trial</span>

                <span>✓ No Credit Card Required</span>

                <span>✓ Multi-Branch Support</span>

                <span>✓ 24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
