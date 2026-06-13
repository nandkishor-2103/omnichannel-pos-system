import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  createCategory,
  deleteCategory,
  getCategoriesByStore,
  updateCategory,
} from "@/app/store/category/categoryThunk";

import type { Category as CategoryType } from "@/app/store/category/categoryTypes";

import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { FolderTree, PlusIcon } from "lucide-react";

type CategoryFormValues = {
  name: string;
  description: string;
};

export default function Category() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const categories = useAppSelector((state) => state.category.categories);
  console.log("category", categories);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!user?.store?.id) return;

    dispatch(getCategoriesByStore(user.store.id));
  }, [dispatch, user?.store?.id]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      [category.name, category.description]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [categories, searchTerm]);

  const handleCreateCategory = async (values: CategoryFormValues) => {
    if (!user?.store?.id) return;

    await dispatch(
      createCategory({
        name: values.name,
        description: values.description,
        storeId: user.store.id,
      })
    ).unwrap();

    setIsAddDialogOpen(false);
  };

  const handleUpdateCategory = async (values: CategoryFormValues) => {
    if (!selectedCategory) return;

    await dispatch(
      updateCategory({
        id: selectedCategory.id,
        dto: {
          name: values.name,
          description: values.description,
        },
      })
    ).unwrap();

    setSelectedCategory(null);

    setIsEditDialogOpen(false);
  };

  const handleDeleteCategory = async (categoryId: string) => {
    await dispatch(deleteCategory(categoryId)).unwrap();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Category Management</h1>

          <div className="flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1.5">
            <FolderTree className="h-4 w-4 text-primary" />

            <span className="text-sm font-medium text-primary">
              Total Categories: {categories.length}
            </span>
          </div>
        </div>

        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Add New Category</DialogTitle>
            </DialogHeader>

            <CategoryForm
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmit={handleCreateCategory}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <CategoryTable
          categories={filteredCategories}
          onEdit={(category) => {
            setSelectedCategory(category);

            setIsEditDialogOpen(true);
          }}
          onDelete={handleDeleteCategory}
        />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Edit Category</DialogTitle>
          </DialogHeader>

          {selectedCategory && (
            <CategoryForm
              isEditing
              initialValues={{
                name: selectedCategory.name,
                description: selectedCategory.description ?? "",
              }}
              onCancel={() => {
                setSelectedCategory(null);

                setIsEditDialogOpen(false);
              }}
              onSubmit={handleUpdateCategory}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
