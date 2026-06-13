import { useState } from "react";

import { Field, Form, Formik, type FieldProps } from "formik";

import type { Category } from "@/app/store/category/categoryTypes";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Textarea } from "@/components/ui/textarea";

export type ProductFormValues = {
  name: string;
  sku: string;
  description: string;
  mrp: string;
  sellingPrice: string;
  brand: string;
  categoryId: string;
  image: string;
};

type ProductFormProps = {
  categories: Category[];
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel?: () => void;
  isEditing?: boolean;
};

export default function ProductForm({
  categories,
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  const [openCategory, setOpenCategory] = useState(false);

  const defaultValues: ProductFormValues = {
    name: "",
    sku: "",
    description: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    categoryId: "",
    image: "",
    ...initialValues,
  };

  return (
    <Formik<ProductFormValues>
      enableReinitialize
      initialValues={defaultValues}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>

              <Field as={Input} name="name" placeholder="Enter product name" />
            </div>

            {/* SKU */}
            <div className="space-y-2">
              <label className="text-sm font-medium">SKU</label>

              <Field as={Input} name="sku" placeholder="Enter SKU" />
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Brand</label>

              <Field as={Input} name="brand" placeholder="Enter brand name" />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>

              <Field name="categoryId">
                {({ field }: FieldProps) => (
                  <Popover open={openCategory} onOpenChange={setOpenCategory}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? categories.find(
                              (category) => (category.id ?? category.id) === field.value
                            )?.name
                          : "Select category"}

                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />

                        <CommandEmpty>No category found.</CommandEmpty>

                        <CommandGroup className="h-[200px] overflow-y-auto">
                          {categories.map((category) => {
                            const categoryId = category.id ?? category.id;

                            return (
                              <CommandItem
                                key={categoryId}
                                value={category.name}
                                onSelect={() => {
                                  setFieldValue("categoryId", categoryId);

                                  setOpenCategory(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    field.value === categoryId
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />

                                {category.name}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              </Field>
            </div>

            {/* MRP */}
            <div className="space-y-2">
              <label className="text-sm font-medium">MRP</label>

              <Field as={Input} type="number" name="mrp" placeholder="Enter MRP" />
            </div>

            {/* Selling Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Selling Price</label>

              <Field
                as={Input}
                type="number"
                name="sellingPrice"
                placeholder="Enter selling price"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Product Image URL</label>

            <Field as={Input} name="image" placeholder="Paste image URL" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Field
              as={Textarea}
              name="description"
              rows={4}
              placeholder="Enter product description"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            )}

            <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
