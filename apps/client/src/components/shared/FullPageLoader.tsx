import { Loader2, ShoppingCart } from "lucide-react";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-xl shadow-primary/20">
          <ShoppingCart className="h-10 w-10 text-primary-foreground" />
        </div>

        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight">POS Pro</h1>

        <p className="mt-2 text-sm text-muted-foreground">Retail Management System</p>

        {/* Loader */}
        <div className="mt-8 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />

          <span className="text-sm font-medium text-muted-foreground">
            Preparing your workspace...
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-2 w-64 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-16 animate-[loader_2.5s_linear_infinite] rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        </div>
      </div>
    </div>
  );
}
