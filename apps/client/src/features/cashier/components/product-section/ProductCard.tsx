import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Product } from "../../../../app/store/product/productTypes";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = Math.round(
    ((product.mrp - product.sellingPrice) / product.mrp) * 100
  );

  return (
    <Card className="cursor-pointer py-4 transition-all duration-200 hover:scale-[1.02] hover:bg-muted hover:shadow-sm active:translate-y-1 active:scale-100">
      <CardContent>
        {/* Product Image */}
        <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-muted">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover object-center"
          />

          {discountPercentage > 0 && (
            <span className="absolute left-2 top-2 rounded-md bg-green-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Product Details */}
        <div>
          <h3 className="truncate text-sm font-medium">
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground">
            {product.sku}
          </p>

          {/* Price + Category */}
          <div className="mt-3 flex items-end justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-green-700">
                  ₹{product.sellingPrice}
                </span>

                {product.mrp > product.sellingPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{product.mrp}
                  </span>
                )}
              </div>

              {product.mrp > product.sellingPrice && (
                <span className="text-[11px] text-green-600">
                  Save ₹{product.mrp - product.sellingPrice}
                </span>
              )}
            </div>

            {product.category?.name && (
              <Badge
                variant="outline"
                className="max-w-[120px] shrink-0 truncate text-xs"
                title={product.category.name}
              >
                {product.category.name}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
