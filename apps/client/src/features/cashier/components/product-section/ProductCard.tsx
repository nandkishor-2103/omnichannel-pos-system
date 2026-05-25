import { Badge } from "@/components/ui/badge.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";

type Product = {
  image: string;
  name: string;
  sku: string;
  sellingPrice: number;
  category: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="py-4 hover:scale-105 transition-transform duration-300 hover:cursor-pointer hover:bg-muted">
      <CardContent>
        <div className="bg-muted mb-2 flex aspect-square items-center justify-center rounded-md">
          <img
            className="h-35 w-35 object-cover rounded-md"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div>
          <h3 className="truncate text-sm font-medium">{product.name}</h3>
          <p className="text-muted-foreground text-xs">{product.sku}</p>

          <div className="flex items-center justify-between">
            <p className="font-semibold text-green-700">₹{product.sellingPrice}</p>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
