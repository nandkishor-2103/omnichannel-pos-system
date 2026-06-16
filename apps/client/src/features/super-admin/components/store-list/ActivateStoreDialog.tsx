import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { activateStore } from "@/app/store/store/storeThunk";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

type Props = {
  storeId: string;
  storeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ActivateStoreDialog({
  storeId,
  storeName,
  open,
  onOpenChange,
}: Props) {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.store.loading);

  const [submitting, setSubmitting] = useState(false);

  const handleActivate = async () => {
    try {
      setSubmitting(true);

      const resultAction = await dispatch(activateStore(storeId));

      if (activateStore.fulfilled.match(resultAction)) {
        onOpenChange(false);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Activate Store</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to activate{" "}
            <span className="font-semibold">{storeName}</span>?
            <br />
            <br />
            Once activated, store employees will be able to access the system and perform
            business operations again.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleActivate();
            }}
            disabled={loading || submitting}
          >
            {submitting ? (
              <LoadingSpinner size={14} text="Activating..." />
            ) : (
              "Activate Store"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
