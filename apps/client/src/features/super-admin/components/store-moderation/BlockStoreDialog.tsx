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

import { ShieldX } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  storeId: string;
  storeName: string;
};

export default function BlockStoreDialog({
  open,
  onOpenChange,
  storeId,
  storeName,
}: Props) {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const handleBlock = async () => {
    try {
      setLoading(true);

      await dispatch(
        moderateStore({
          storeId,
          action: "BLOCKED",
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
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <ShieldX className="h-5 w-5" />
            Block Store
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to block{" "}
            <span className="font-semibold text-foreground">{storeName}</span>
            ?
            <br />
            <br />
            All users belonging to this store will immediately lose access to the POS
            system until the store is activated again by Super Admin.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleBlock}
            disabled={loading}
            className="cursor-pointer bg-red-600 hover:bg-red-700"
          >
            {loading ? "Blocking..." : "Block Store"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
