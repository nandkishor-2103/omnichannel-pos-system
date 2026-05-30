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
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

export default function Category() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Category Management</h1>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add New Category</DialogTitle>
            </DialogHeader>

            <CategoryForm
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmit={(values) => {
                console.log(values);
                setIsAddDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <CategoryTable onEdit={() => setIsEditDialogOpen(true)} />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Edit Category</DialogTitle>
          </DialogHeader>

          <CategoryForm
            isEditing={true}
            onCancel={() => setIsEditDialogOpen(false)}
            onSubmit={(values) => {
              console.log(values);
              setIsAddDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
