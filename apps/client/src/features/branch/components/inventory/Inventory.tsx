import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import InventoryFormDialog from "./InventoryFormDialog";
import InventoryTable from "./InventoryTable";

export default function Inventory() {
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const [quantity, setQuantity] = useState<number>(1);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleAddInventory = (): void => {
    console.log(selectedProductId, quantity);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Inventory
          </Button>
        </div>
      </div>

      <InventoryTable setIsEditDialogOpen={setIsEditDialogOpen} />

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
        onSubmit={handleAddInventory}
      />
    </div>
  );
}
