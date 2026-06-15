import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

import type { Store } from "@/app/store/store/storeTypes";

type BasicInfoProps = {
  store: Store;
};

export default function BasicInfo({ store }: BasicInfoProps) {
  const getStatusVariant = () => {
    switch (store.status) {
      case "ACTIVE":
        return "default";

      case "BLOCKED":
        return "destructive";

      default:
        return "secondary";
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Basic Information</h3>

      <div className="space-y-5">
        {/* Store Name */}
        <div>
          <Label className="text-sm text-muted-foreground">Store Name</Label>

          <p className="font-medium">{store.brand || "-"}</p>
        </div>

        {/* Store Type */}
        <div>
          <Label className="text-sm text-muted-foreground">Store Type</Label>

          <div className="mt-1">
            <Badge variant="secondary">{store.storeType || "Not Provided"}</Badge>
          </div>
        </div>

        {/* Status - Read Only */}
        <div>
          <Label className="text-sm text-muted-foreground">Status</Label>

          <div className="mt-1">
            <Badge variant={getStatusVariant()}>{store.status || "PENDING"}</Badge>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            Status can only be managed by Super Admin.
          </p>
        </div>

        {/* Description */}
        <div>
          <Label className="text-sm text-muted-foreground">Description</Label>

          <p className="font-medium">{store.description || "No description provided"}</p>
        </div>

        {/* Created Date */}
        <div>
          <Label className="text-sm text-muted-foreground">Created On</Label>

          <p className="font-medium">
            {store.createdAt
              ? new Date(store.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
