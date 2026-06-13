import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  createProduct,
  deleteProduct,
  getProductsByStore,
  updateProduct,
} from "@/app/store/product/productThunk";

import { getCategoriesByStore } from "@/app/store/category/categoryThunk";

import type { Product } from "@/app/store/product/productTypes";

import ProductForm, { type ProductFormValues } from "./ProductForm";

import ProductTable from "./ProductTable";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Package, PlusIcon } from "lucide-react";

export default function Products() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const products = useAppSelector((state) => state.product.products);

  const categories = useAppSelector((state) => state.category.categories);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!user?.store?.id) return;

    dispatch(getProductsByStore(user.store.id));

    dispatch(getCategoriesByStore(user.store.id));
  }, [dispatch, user?.store?.id]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      [product.name, product.sku, product.brand, product.category?.name]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  const handleCreateProduct = async (values: ProductFormValues) => {
    if (!user?.store?.id) return;

    await dispatch(
      createProduct({
        name: values.name,
        sku: values.sku,
        description: values.description,
        mrp: Number(values.mrp),
        sellingPrice: Number(values.sellingPrice),
        brand: values.brand,
        image: values.image,
        category: values.categoryId,
        store: user.store.id,
      })
    ).unwrap();

    setIsAddDialogOpen(false);
  };

  const handleUpdateProduct = async (values: ProductFormValues) => {
    if (!selectedProduct) return;

    await dispatch(
      updateProduct({
        id: selectedProduct._id,
        dto: {
          name: values.name,
          sku: values.sku,
          description: values.description,
          mrp: Number(values.mrp),
          sellingPrice: Number(values.sellingPrice),
          brand: values.brand,
          image: values.image,
          category: values.categoryId,
        },
      })
    ).unwrap();

    setSelectedProduct(null);

    setIsEditDialogOpen(false);
  };

  const handleDeleteProduct = async (productId: string) => {
    await dispatch(deleteProduct(productId)).unwrap();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold">Product Management</h1>

          <div className="flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-1.5">
            <Package className="h-4 w-4 text-primary" />

            <span className="text-sm font-medium text-primary">
              Total Products: {products.length}
            </span>
          </div>
        </div>

        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusIcon className="h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>

          <DialogContent className="min-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-center">Add New Product</DialogTitle>
            </DialogHeader>

            <ProductForm
              categories={categories}
              onCancel={() => setIsAddDialogOpen(false)}
              onSubmit={handleCreateProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-h-[70vh] overflow-y-auto">
        <ProductTable
          products={filteredProducts}
          onDelete={handleDeleteProduct}
          onEdit={(product) => {
            setSelectedProduct(product);
            setIsEditDialogOpen(true);
          }}
        />
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="min-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Product</DialogTitle>
          </DialogHeader>

          {selectedProduct && (
            <ProductForm
              isEditing
              categories={categories}
              initialValues={{
                name: selectedProduct.name,
                sku: selectedProduct.sku,
                description: selectedProduct.description ?? "",
                mrp: selectedProduct.mrp.toString(),
                sellingPrice: selectedProduct.sellingPrice.toString(),
                brand: selectedProduct.brand ?? "",
                image: selectedProduct.image ?? "",
                categoryId: selectedProduct.category?._id ?? "",
              }}
              onCancel={() => {
                setSelectedProduct(null);

                setIsEditDialogOpen(false);
              }}
              onSubmit={handleUpdateProduct}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
