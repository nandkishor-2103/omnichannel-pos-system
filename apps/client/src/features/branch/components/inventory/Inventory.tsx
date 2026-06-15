import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import InventoryFormDialog from "./InventoryFormDialog";
import InventoryTable from "./InventoryTable";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  createInventory,
  getInventoryByBranch,
  updateInventory,
} from "@/app/store/inventory/inventoryThunk";
import { getProductsByStore } from "@/app/store/product/productThunk";
import { toast } from "sonner";

export default function Inventory() {
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const [selectedInventoryId, setSelectedInventoryId] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState("");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const inventories = useAppSelector((state) => state.inventory.inventories);

  const handleAddInventory = async () => {
    if (!selectedProductId) {
      toast.warning("Please select a product");

      return;
    }

    if (!user?.branch?.id) {
      toast.error("Branch not found");

      return;
    }

    const resultAction = await dispatch(
      createInventory({
        branchId: user?.branch?.id,
        productId: selectedProductId,
        quantity,
      })
    );

    if (createInventory.fulfilled.match(resultAction)) {
      dispatch(getInventoryByBranch(user?.branch?.id));

      setSelectedProductId("");
      setQuantity(1);

      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateInventory = async () => {
    if (!selectedInventoryId) {
      toast.warning("Please select inventory");
      return;
    }

    const resultAction = await dispatch(
      updateInventory({
        id: selectedInventoryId,
        dto: {
          quantity,
        },
      })
    );

    if (updateInventory.fulfilled.match(resultAction)) {
      if (user?.branch?.id) {
        dispatch(getInventoryByBranch(user?.branch?.id));
      }

      setSelectedInventoryId("");
      setSelectedProductId("");
      setQuantity(1);

      setIsEditDialogOpen(false);
    }
  };

  useEffect(() => {
    if (user?.branch?.id && user.store?.id) {
      dispatch(getInventoryByBranch(user?.branch?.id));
      dispatch(getProductsByStore(user.store.id));
    }
  }, [dispatch, user?.branch?.id, user?.store?.id]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and monitor branch inventory stock.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex justify-center">
          <div className="rounded-xl border bg-muted/30 px-6 py-1 text-center min-w-[140px]">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Total Products:
            </span>

            <span className="text-sm font-bold ml-2">{inventories.length}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search SKU, product or category..."
              className="w-[300px] pl-9"
            />
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Inventory
          </Button>
        </div>
      </div>

      <InventoryTable
        searchTerm={searchTerm}
        setIsEditDialogOpen={setIsEditDialogOpen}
        setSelectedInventoryId={setSelectedInventoryId}
        setSelectedProductId={setSelectedProductId}
        setQuantity={setQuantity}
      />

      <InventoryFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        mode="add"
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={handleAddInventory}
      />

      <InventoryFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        selectedProductId={selectedProductId}
        setSelectedProductId={setSelectedProductId}
        quantity={quantity}
        setQuantity={setQuantity}
        onSubmit={handleUpdateInventory}
      />
    </div>
  );
}
