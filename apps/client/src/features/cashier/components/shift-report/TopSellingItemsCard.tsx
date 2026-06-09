import { useAppSelector } from "@/app/store/hooks";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TrendingUpIcon } from "lucide-react";

export default function TopSellingItemsCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const topSellingProducts = currentShift?.topSellingProducts ?? [];

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardHeader className="border-b bg-muted/20 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Top Selling Items</CardTitle>

          <Badge className="gap-1 rounded-full px-2 py-0.5 text-xs">
            <TrendingUpIcon className="h-3 w-3" />
            Top {topSellingProducts.length} Products
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3">
        {topSellingProducts.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground">No sales data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div
                key={product.id}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  bg-background
                  p-3
                  transition-all
                  hover:bg-accent/30
                "
              >
                {/* Rank */}
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/10
                    text-sm
                    font-bold
                    text-primary
                  "
                >
                  #{index + 1}
                </div>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg border object-cover"
                />

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{product.name}</h3>

                    <span className="text-sm font-bold text-green-700">
                      ₹{product.sellingPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{product.quantitySold} sold</span>

                    <span>
                      ₹{(product.quantitySold * product.sellingPrice).toFixed(2)} revenue
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    SKU: {product.sku}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
