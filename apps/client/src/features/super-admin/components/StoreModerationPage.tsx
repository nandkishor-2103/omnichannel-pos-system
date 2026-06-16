import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getAllStores } from "@/app/store/store/storeThunk";

import { Badge } from "@/components/ui/badge";

import { Clock3 } from "lucide-react";

import StoreModerationTable from "./store-moderation/StoreModerationTable";

export default function StoreModerationPage() {
  const dispatch = useAppDispatch();

  const stores = useAppSelector((state) => state.store.stores);

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  const moderationStores = stores.filter(
    (store) => store.status === "PENDING" || store.status === "BLOCKED"
  );

  const pendingCount = stores.filter((store) => store.status === "PENDING").length;

  const blockedCount = stores.filter((store) => store.status === "BLOCKED").length;

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Store Moderation</h1>

          <p className="text-muted-foreground">
            Review, approve and manage store registrations.
          </p>
        </div>

        <div className="flex gap-3">
          <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Clock3 className="h-4 w-4" />
            Pending: {pendingCount}
          </Badge>

          <Badge variant="destructive" className="gap-2 px-3 py-1">
            Blocked: {blockedCount}
          </Badge>
        </div>
      </div>

      {/* Table */}

      <div className="max-h-[70vh] overflow-y-auto">
        <StoreModerationTable stores={moderationStores} />
      </div>
    </div>
  );
}
