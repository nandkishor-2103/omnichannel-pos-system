import { useState } from "react";

import type { Category } from "@/app/store/category/categoryTypes";

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

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Edit, Trash2 } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";

type CategoryTableProps = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
};

export default function CategoryTable({
  categories,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  //   const truncateText = (text?: string, maxLength = 60) => {
  //     if (!text) return "-";

  //     return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  //   };

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">#</TableHead>

            <TableHead className="text-center">Category Name</TableHead>

            {/* <TableHead>Description</TableHead> */}

            <TableHead className="text-center">Created On</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                No categories found
              </TableCell>
            </TableRow>
          ) : (
            categories.map((category, index) => (
              <TableRow key={category.id} className="transition-colors hover:bg-muted/30">
                <TableCell className="font-medium">{index + 1}</TableCell>

                <TableCell className="text-center font-medium">{category.name}</TableCell>

                {/* <TableCell className="max-w-[400px] text-muted-foreground">
                  {truncateText(category.description)}
                </TableCell> */}

                <TableCell className="text-center">
                  {formatDate(category.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => onEdit(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => setCategoryToDelete(category)}
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

      <AlertDialog
        open={!!categoryToDelete}
        onOpenChange={() => setCategoryToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{categoryToDelete?.name}</strong>?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="cursor-pointer"
              onClick={() => {
                if (categoryToDelete) {
                  onDelete(categoryToDelete.id);
                }

                setCategoryToDelete(null);
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
