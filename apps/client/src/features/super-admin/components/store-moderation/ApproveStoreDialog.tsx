import { useState } from "react";

import { useAppDispatch } from "@/app/store/hooks";
import { moderateStore } from "@/app/store/store/storeThunk";

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

import { CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  storeId: string;
  storeName: string;
};

export default function ApproveStoreDialog({
  open,
  onOpenChange,
  storeId,
  storeName,
}: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setLoading(true);

      await dispatch(
        moderateStore({
          storeId,
          action: "ACTIVE",
        })
      ).unwrap();

      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Approve Store
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to approve{" "}
            <span className="font-semibold text-foreground">{storeName}</span>
            ?
            <br />
            <br />
            The store will become active immediately and all authorized users will be able
            to access the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleApprove}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? "Approving..." : "Approve Store"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
