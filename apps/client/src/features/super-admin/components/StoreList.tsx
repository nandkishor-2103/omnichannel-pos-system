import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getAllStores } from "@/app/store/store/storeThunk";

import { Input } from "@/components/ui/input";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

import StoreTable from "./store-list/StoreTable";

export default function StoreList() {
  const dispatch = useAppDispatch();

  const { stores, loading } = useAppSelector((state) => state.store);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllStores());
  }, [dispatch]);

  const totalStores = useMemo(() => stores.length, [stores]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner size={24} text="Loading stores..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="grid gap-4 lg:grid-cols-3 lg:items-center">
        <div>
          <h1 className="text-2xl font-bold">Store Management</h1>

          <p className="text-muted-foreground">
            Manage and monitor all registered stores.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="rounded-lg border px-6 py-3 text-center">
            <span className="text-muted-foreground">Total Stores:</span>

            <span className="ml-2 font-semibold">{totalStores}</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Input
            placeholder="Search store, admin name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-[350px]"
          />
        </div>
      </div>

      {/* Table */}

      <div className="rounded-lg bg-background">
        <div className="max-h-[70vh] overflow-y-auto">
          <StoreTable stores={stores} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
}
