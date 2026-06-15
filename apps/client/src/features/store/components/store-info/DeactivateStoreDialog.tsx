import { useMemo, useState } from "react";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  loading?: boolean;

  onConfirm: () => void;
};

const CONFIRMATION_TEXT = "DEACTIVATE MY STORE";

export default function DeactivateStoreDialog({
  open,
  onOpenChange,
  loading = false,
  onConfirm,
}: Props) {
  const [confirmationText, setConfirmationText] = useState("");

  const [accepted, setAccepted] = useState(false);

  const canDeactivate = useMemo(() => {
    return confirmationText.trim() === CONFIRMATION_TEXT && accepted && !loading;
  }, [confirmationText, accepted, loading]);

  const handleClose = () => {
    setConfirmationText("");
    setAccepted(false);

    onOpenChange(false);
  };

  const handleConfirm = () => {
    if (!canDeactivate) return;

    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          handleClose();
          return;
        }

        onOpenChange(value);
      }}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Deactivate Store
          </DialogTitle>

          <DialogDescription>
            This action will deactivate your store and disable all store operations.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <h4 className="mb-2 font-semibold">What will happen?</h4>

            <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li>POS operations will stop.</li>

              <li>Employees will lose access.</li>

              <li>Orders cannot be created.</li>

              <li>Inventory operations will be disabled.</li>

              <li>Store will become inactive.</li>

              <li>Existing business data will remain محفوظ and will not be deleted.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Type the following phrase to continue:</p>

            <div className="rounded-md border bg-muted px-3 py-2 font-mono text-sm">
              {CONFIRMATION_TEXT}
            </div>

            <Input
              placeholder="Type confirmation phrase"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="confirm-store-deactivation"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(Boolean(checked))}
            />

            <label
              htmlFor="confirm-store-deactivation"
              className="text-sm leading-relaxed"
            >
              I understand that this action will deactivate my store and stop store
              operations until it is reactivated.
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="destructive" disabled={!canDeactivate} onClick={handleConfirm}>
            {loading ? "Deactivating..." : "Deactivate Store"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
