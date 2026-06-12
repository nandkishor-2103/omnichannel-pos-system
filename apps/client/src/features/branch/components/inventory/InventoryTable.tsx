import { useMemo } from "react";

import { useAppSelector } from "@/app/store/hooks";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Edit } from "lucide-react";

type InventoryTableProps = {
  searchTerm: string;
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedInventoryId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProductId: React.Dispatch<React.SetStateAction<string>>;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function InventoryTable({
  searchTerm,
  setIsEditDialogOpen,
  setSelectedInventoryId,
  setSelectedProductId,
  setQuantity,
}: InventoryTableProps) {
  const inventories = useAppSelector((state) => state.inventory.inventories);

  const filteredInventories = useMemo(() => {
    const filtered = inventories.filter((item) => {
      if (!item?.product) return false;

      if (!searchTerm.trim()) return true;

      const term = searchTerm.toLowerCase();

      return (
        item.product.name?.toLowerCase().includes(term) ||
        item.product.sku?.toLowerCase().includes(term) ||
        item.product.category?.name?.toLowerCase().includes(term)
      );
    });

    return [...filtered].sort((a, b) => {
      const getPriority = (qty: number) => {
        if (qty <= 5) return 1; // Critical
        if (qty <= 20) return 2; // Warning
        return 3; // Healthy
      };

      const priorityA = getPriority(a.quantity);
      const priorityB = getPriority(b.quantity);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return a.quantity - b.quantity;
    });
  }, [inventories, searchTerm]);

  return (
    <div className="mt-6">
      <div className="max-h-[535px] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background shadow-sm">
            <TableRow>
              <TableHead className="w-[70px]">#</TableHead>

              <TableHead>SKU</TableHead>

              <TableHead>Product Name</TableHead>

              <TableHead>Category</TableHead>

              <TableHead>Quantity</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredInventories.length > 0 ? (
              filteredInventories.map((item, index) => {
                const isLowStock = item.quantity <= 5;
                const isMediumStock = item.quantity > 5 && item.quantity <= 20;

                return (
                  <TableRow
                    key={item._id}
                    className={`
                      transition-all duration-200
                      ${
                        isLowStock
                          ? "bg-red-500/5 hover:bg-red-500/10"
                          : "hover:bg-muted/40"
                      }
                    `}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>

                    <TableCell className="font-medium">{item.product.sku}</TableCell>

                    <TableCell>
                      <div className="font-medium">{item.product.name}</div>
                    </TableCell>

                    <TableCell>{item.product.category.name}</TableCell>

                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className={`
                                inline-flex min-w-[80px]
                                items-center justify-center
                                rounded-full px-3 py-1.5
                                text-xs font-bold border
                                ${
                                  isLowStock
                                    ? "border-red-200 bg-red-100 text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400"
                                    : isMediumStock
                                      ? "border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                                      : "border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                                }
                              `}
                            >
                              {item.quantity}
                            </span>
                          </TooltipTrigger>

                          <TooltipContent>
                            {isLowStock ? (
                              <p>🚨 Low stock alert. Restock immediately.</p>
                            ) : isMediumStock ? (
                              <p>⚠️ Stock is running low.</p>
                            ) : (
                              <p>✅ Stock level is healthy.</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        onClick={() => {
                          setSelectedInventoryId(item._id);
                          setSelectedProductId(item.product._id);
                          setQuantity(item.quantity);
                          setIsEditDialogOpen(true);
                        }}
                        variant="outline"
                        className="cursor-pointer"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No inventory found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
