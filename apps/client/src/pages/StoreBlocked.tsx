import { ShieldX, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function StoreBlocked() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-card p-8 shadow-sm">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <ShieldX className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold">Store Access Blocked</h1>

          <p className="mt-4 text-muted-foreground">
            Your store has been blocked by the Super Admin.
          </p>

          <p className="mt-2 text-muted-foreground">
            Please contact support or your administrator for assistance.
          </p>

          <Button
            className="mt-8 w-full cursor-pointer"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
