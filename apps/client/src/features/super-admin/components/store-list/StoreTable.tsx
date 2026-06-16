import { useMemo, useState } from "react";

import type { Store } from "@/app/store/store/storeTypes";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUpDown, Power } from "lucide-react";

import StoreStatusBadge from "./StoreStatusBadge";
import ActivateStoreDialog from "./ActivateStoreDialog";

type Props = {
  stores: Store[];
  searchTerm: string;
};

export default function StoreTable({ stores, searchTerm }: Props) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const filteredStores = useMemo(() => {
    return [...stores]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
      )
      .filter((store) => {
        const query = searchTerm.toLowerCase();

        return (
          store.brand.toLowerCase().includes(query) ||
          store.storeAdmin?.fullName?.toLowerCase().includes(query) ||
          store.storeAdmin?.email?.toLowerCase().includes(query)
        );
      });
  }, [stores, searchTerm]);

  const hasInactiveStore = useMemo(
    () => filteredStores.some((store) => store.status === "INACTIVE"),
    [filteredStores]
  );

  const getRowClassName = (status?: Store["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50/40";

      case "PENDING":
        return "bg-yellow-50/40";

      case "BLOCKED":
        return "bg-red-50/40";

      case "INACTIVE":
        return "bg-slate-100/70";

      default:
        return "";
    }
  };

  if (filteredStores.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border">
        <p className="text-sm text-muted-foreground">No stores found.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                Store
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>

            <TableHead>Store Admin</TableHead>

            <TableHead>Contact</TableHead>

            <TableHead>Store Type</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Created On</TableHead>

            {hasInactiveStore && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredStores.map((store) => (
            <TableRow key={store._id} className={getRowClassName(store.status)}>
              <TableCell>
                <div>
                  <p className="font-medium">{store.brand}</p>
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

                  <p className="text-xs text-muted-foreground">{store.contact?.email}</p>
                </div>
              </TableCell>

              <TableCell>{store.storeType || "-"}</TableCell>

              <TableCell>
                <StoreStatusBadge status={store.status} />
              </TableCell>

              <TableCell>
                {store.createdAt
                  ? new Date(store.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </TableCell>

              {hasInactiveStore && (
                <TableCell className="text-right">
                  {store.status === "INACTIVE" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => setSelectedStore(store)}
                    >
                      <Power className="mr-2 h-4 w-4" />
                      Activate
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedStore && (
        <ActivateStoreDialog
          open={!!selectedStore}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedStore(null);
            }
          }}
          storeId={selectedStore._id}
          storeName={selectedStore.brand}
        />
      )}
    </>
  );
}
