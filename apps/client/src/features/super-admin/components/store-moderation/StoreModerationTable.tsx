import { useMemo, useState } from "react";

import type { Store } from "@/app/store/store/storeTypes";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { CheckCircle2, ShieldX } from "lucide-react";

import StoreModerationStatusBadge from "./StoreModerationStatusBadge";
import ApproveStoreDialog from "./ApproveStoreDialog";
import BlockStoreDialog from "./BlockStoreDialog";

type Props = {
  stores: Store[];
};

export default function StoreModerationTable({ stores }: Props) {
  const [approveStore, setApproveStore] = useState<Store | null>(null);

  const [blockStore, setBlockStore] = useState<Store | null>(null);

  const moderationStores = useMemo(() => {
    return [...stores]
      .filter((store) => ["PENDING", "BLOCKED"].includes(store.status ?? ""))
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
      );
  }, [stores]);

  const getRowClassName = (status?: Store["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-50/40";

      case "BLOCKED":
        return "bg-red-50/40";

      default:
        return "";
    }
  };

  if (moderationStores.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border">
        <p className="text-sm text-muted-foreground">No stores require moderation.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead>Store</TableHead>

            <TableHead>Store Admin</TableHead>

            <TableHead>Contact</TableHead>

            <TableHead>Store Type</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Created On</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {moderationStores.map((store) => (
            <TableRow key={store._id} className={getRowClassName(store.status)}>
              <TableCell>
                <div>
                  <p className="font-medium">{store.brand}</p>

                  <p className="text-xs text-muted-foreground">{store.contact?.email}</p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p>{store.storeAdmin?.fullName}</p>

                  <p className="text-xs text-muted-foreground">
                    {store.storeAdmin?.email}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p>{store.contact?.phone || "-"}</p>

                  <p className="text-xs text-muted-foreground">
                    {store.contact?.address}
                  </p>
                </div>
              </TableCell>

              <TableCell>{store.storeType || "-"}</TableCell>

              <TableCell>
                <StoreModerationStatusBadge status={store.status} />
              </TableCell>

              <TableCell>
                {store.createdAt
                  ? new Date(store.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {store.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => setApproveStore(store)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Approve
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={() => setBlockStore(store)}
                      >
                        <ShieldX className="mr-2 h-4 w-4" />
                        Block
                      </Button>
                    </>
                  )}

                  {store.status === "BLOCKED" && (
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => setApproveStore(store)}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Activate
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {approveStore && (
        <ApproveStoreDialog
          open={!!approveStore}
          onOpenChange={(open) => {
            if (!open) {
              setApproveStore(null);
            }
          }}
          storeId={approveStore._id}
          storeName={approveStore.brand}
        />
      )}

      {blockStore && (
        <BlockStoreDialog
          open={!!blockStore}
          onOpenChange={(open) => {
            if (!open) {
              setBlockStore(null);
            }
          }}
          storeId={blockStore._id}
          storeName={blockStore.brand}
        />
      )}
    </>
  );
}
