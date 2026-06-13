import { useState } from "react";

import type { Product } from "@/app/store/product/productTypes";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { AlertTriangle, Edit, Trash2 } from "lucide-react";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>

            <TableHead>Product</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>SKU</TableHead>

            <TableHead>MRP</TableHead>

            <TableHead>Selling Price</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-10 text-center text-muted-foreground">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow
                key={product._id}
                className={`transition-colors hover:bg-muted/30 ${
                  !product.category
                    ? "bg-amber-50/60 hover:bg-amber-100/60 dark:bg-amber-950/20"
                    : ""
                }`}
              >
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image || "https://placehold.co/60x60?text=No+Image"}
                      alt={product.name}
                      className="h-12 w-12 rounded-md border object-cover"
                    />

                    <div>
                      <p className="font-medium">{product.name}</p>

                      <p className="max-w-[250px] truncate text-xs text-muted-foreground">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  {product.category?.name ? (
                    product.category.name
                  ) : (
                    <div className="flex items-center gap-2 text-amber-600 font-medium">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Not Assigned</span>
                    </div>
                  )}
                </TableCell>

                <TableCell>{product.sku}</TableCell>

                <TableCell>₹{product.mrp.toLocaleString()}</TableCell>

                <TableCell className="font-medium text-green-600">
                  ₹{product.sellingPrice.toLocaleString()}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onEdit(product)}
                      className="cursor-pointer"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setProductToDelete(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{productToDelete?.name}</strong>
              ?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => {
                if (productToDelete) {
                  onDelete(productToDelete._id);
                }

                setProductToDelete(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
