import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUpIcon } from "lucide-react";

type TopSellingProduct = {
  id: number;
  name: string;
  sellingPrice: number;
  quantity: number;
};

type ShiftData = {
  topSellingProducts: TopSellingProduct[];
};

const shiftData: ShiftData = {
  topSellingProducts: [
    {
      id: 1,
      name: "Cabbage",
      sellingPrice: 30,
      quantity: 10,
    },
    {
      name: "Carrot",
      id: 2,
      sellingPrice: 20,
      quantity: 5,
    },
    {
      id: 3,
      name: "Mushroom",
      sellingPrice: 30,
      quantity: 10,
    },
  ],
};

export default function TopSellingItemsCard() {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardHeader className="border-b bg-muted/20 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Top Selling Items</CardTitle>

          <Badge className="gap-1 rounded-full px-2 py-0.5 text-xs">
            <TrendingUpIcon className="h-3 w-3" />
            Best Sellers
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-3">
        {shiftData.topSellingProducts.map((product, index) => (
          <div
            key={product.id}
            className="
          flex
          items-center
          gap-3
          rounded-lg
          border
          bg-background
          px-3
          py-2
          transition
          hover:bg-accent/30
        "
          >
            {/* Rank */}
            <div
              className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-sm
            font-semibold
            text-primary
          "
            >
              {index + 1}
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">{product.name}</h3>

                <span className="text-sm font-semibold text-green-700">
                  ₹ {product.sellingPrice}
                </span>
              </div>

              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{product.quantity} sold</span>

                <span>
                  ₹ {(product.quantity * product.sellingPrice).toFixed(0)} revenue
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
