import { useState } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { deactivateSubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

import type { SubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanTypes";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Loader2, PowerOff } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan;
};

export default function DeactivatePlanDialog({ open, onOpenChange, plan }: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleDeactivate = async () => {
    try {
      setLoading(true);

      await dispatch(deactivateSubscriptionPlan(plan._id)).unwrap();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          onOpenChange(value);
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-orange-600">
            <PowerOff className="h-5 w-5" />
            Deactivate Subscription Plan
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to deactivate{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm text-orange-700">
            This plan will no longer be available for new store subscriptions. Existing
            subscriptions will remain unaffected.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button variant="destructive" disabled={loading} onClick={handleDeactivate}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deactivating...
              </>
            ) : (
              <>
                <PowerOff className="mr-2 h-4 w-4" />
                Deactivate Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
