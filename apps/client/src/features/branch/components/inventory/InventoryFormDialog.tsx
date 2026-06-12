import { useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

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
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);

  const products = useAppSelector((state) => state.product.products);

  const [productSearchOpen, setProductSearchOpen] = useState(false);

  const isEdit = mode === "edit";

  const inventories = useAppSelector((state) => state.inventory.inventories);

  const availableProducts = useMemo(() => {
    const inventoryProductIds = new Set(
      inventories.map((inventory) => inventory.product._id)
    );

    return products.filter((product) => !inventoryProductIds.has(product._id));
  }, [products, inventories]);

  const selectedProduct = products.find((product) => product._id === selectedProductId);

  const loading = useAppSelector((state) => state.inventory.loading);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="text-lg font-semibold">
          {isEdit ? "Edit Inventory" : "Add Inventory"}
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* PRODUCT */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium">Product</label>

            {isEdit ? (
              <Input
                value={selectedProduct?.name ?? ""}
                disabled
                className="col-span-3"
              />
            ) : (
              <div className="col-span-3">
                <Popover open={productSearchOpen} onOpenChange={setProductSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedProduct ? `${selectedProduct.name}` : "Search product..."}

                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent align="start" className="w-[420px] p-0">
                    <Command>
                      <CommandInput placeholder="Search product name or SKU..." />

                      <CommandList>
                        <CommandEmpty>
                          {availableProducts.length === 0
                            ? "All products already exist in inventory."
                            : "No product found."}
                        </CommandEmpty>

                        <CommandGroup>
                          {availableProducts.map((product) => (
                            <CommandItem
                              key={product._id}
                              value={`${product.name} ${product.sku}`}
                              onSelect={() => {
                                setSelectedProductId(product._id);
                                setProductSearchOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="font-medium">{product.name}</span>

                                <span className="text-xs text-muted-foreground">
                                  SKU: {product.sku}
                                </span>

                                {product.category?.name && (
                                  <span className="text-xs text-muted-foreground">
                                    Category: {product.category.name}
                                  </span>
                                )}
                              </div>

                              <Check
                                className={`ml-auto h-4 w-4 ${
                                  selectedProductId === product._id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>

          {/* QUANTITY */}
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="font-medium">Quantity</label>

            <Input
              type="number"
              min={1}
              value={quantity === 0 ? "" : quantity}
              onChange={(e) => {
                const value = e.target.value;
                setQuantity(value === "" ? 0 : Number(value));
              }}
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="cursor-pointer min-w-[140px]"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size={16} text={isEdit ? "Updating..." : "Adding..."} />
            ) : isEdit ? (
              "Update Inventory"
            ) : (
              "Add Inventory"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
