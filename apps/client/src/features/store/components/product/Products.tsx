import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import ProductForm, { type ProductFormValues } from "./ProductForm";
import ProductTable from "./ProductTable";

export default function Products() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Product Management</h1>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              Add New Product
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[650px]">
            <DialogHeader>
              <DialogTitle className="text-center">Add New Product</DialogTitle>
            </DialogHeader>

            <ProductForm
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmit={(values: ProductFormValues) => {
                console.log(values);
                setIsAddDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <ProductTable onEdit={() => setIsEditDialogOpen(true)} />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="min-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Product</DialogTitle>
          </DialogHeader>

          <ProductForm
            isEditing={true}
            onCancel={() => setIsEditDialogOpen(false)}
            onSubmit={(values: ProductFormValues) => {
              console.log(values);
              setIsAddDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
