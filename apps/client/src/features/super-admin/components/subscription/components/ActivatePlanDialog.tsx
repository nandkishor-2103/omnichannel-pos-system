import { useState } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { activateSubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

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

import { Loader2, Power } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan;
};

export default function ActivatePlanDialog({ open, onOpenChange, plan }: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    try {
      setLoading(true);

      await dispatch(activateSubscriptionPlan(plan._id)).unwrap();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <Power className="h-5 w-5" />
            Activate Subscription Plan
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to activate{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">
            This plan will become available for stores to subscribe immediately.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleActivate}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <Power className="mr-2 h-4 w-4" />
                Activate Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
