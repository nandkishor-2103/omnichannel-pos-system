import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  id: string;
  sku: string;
  name: string;
};

type InventoryFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  selectedProductId: string;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: () => void;
};

export default function InventoryFormDialog({
  open,
  onOpenChange,
  mode,
  selectedProductId,
  setSelectedProductId,
  quantity,
  setQuantity,
  onSubmit,
}: InventoryFormDialogProps) {
  const isEdit = mode === "edit";

  const selectedProduct: { name: string } = {
    name: "Cabbage",
  };

  const products: Product[] = [
    {
      id: "12345",
      sku: "CAB-456",
      name: "Cabbage",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="font-semibold text-lg">
          {isEdit ? "Edit Inventory" : "Add Inventory"}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="product">Product</label>

            {isEdit ? (
              <Input
                id="product"
                value={selectedProduct.name}
                disabled
                className="col-span-3"
              />
            ) : (
              <Select
                value={String(selectedProductId)}
                onValueChange={(value: string) => setSelectedProductId(value)}
              >
                <SelectTrigger className="w-full col-span-3">
                  <SelectValue placeholder="Select a product..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All Product</SelectItem>

                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name || product.sku}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="quantity">Quantity</label>

            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
            variant={"outline"}
          >
            Cancel
          </Button>

          <Button className="cursor-pointer" onClick={onSubmit}>
            {isEdit ? "Update Inventory" : "Add Inventory"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
