import { useState } from "react";

import { useAppDispatch } from "@/app/store/hooks";

import { deleteSubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

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

import { Loader2, Trash2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan;
};

export default function DeletePlanDialog({ open, onOpenChange, plan }: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await dispatch(deleteSubscriptionPlan(plan._id)).unwrap();

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
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Subscription Plan
          </DialogTitle>

          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{plan.name}</span>?
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">This action cannot be undone.</p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
