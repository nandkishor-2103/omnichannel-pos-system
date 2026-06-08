import { useEffect, useState } from "react";
import { Barcode, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

import ProductCard from "@/features/cashier/components/product-section/ProductCard";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { getProductsByStore, searchProducts } from "@/app/store/product/productThunk";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { clearSearchResults } from "@/app/store/product/productSlice";

export default function ProductSection() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);
  const products = useAppSelector((state) => state.product.products);
  const loading = useAppSelector((state) => state.product.loading);
  const searchResults = useAppSelector((state) => state.product.searchResults);

  useEffect(() => {
    if (!branch?.store?._id) return;

    dispatch(getProductsByStore(branch.store._id));

    const interval = setInterval(() => {
      if (!branch?.store?._id) return;
      dispatch(getProductsByStore(branch.store._id));
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [dispatch, branch?.store?._id]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchTerm(value);
  };

  useEffect(() => {
    if (!branch?.store?._id) return;

    const timeout = setTimeout(async () => {
      const query = searchTerm.trim();

      if (!query) {
        dispatch(clearSearchResults());
        return;
      }

      const resultAction = await dispatch(
        searchProducts({
          query,
          storeId: branch?.store?._id,
        })
      );

      if (searchProducts.rejected.match(resultAction)) {
        toast.error("Failed to search products");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [dispatch, searchTerm, branch?.store?._id]);

  const displayedProducts = searchTerm.trim() !== "" ? searchResults : products;

  return (
    <div className="w-2/5 flex flex-col bg-card border-r">
      <div className="px-4 py-2 border-b bg-muted">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="p-3 pl-10 focus-visible:ring-green-500"
            value={searchTerm}
            type="text"
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 py-1 border-b">
        <span className="text-sm">{searchResults.length} products found</span>
        <Button variant="outline" size="sm" className="text-xs cursor-pointer">
          <Barcode className="mr-1 h-4 w-4" />
          Scan
        </Button>
      </div>

      {/* Scrollable Products */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <LoadingSpinner size={20} text="Searching products..." />
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid gap-3 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
