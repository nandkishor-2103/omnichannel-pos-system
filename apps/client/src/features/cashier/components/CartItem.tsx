import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemType = {
  name: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
};

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  return (
    <Card className="border-l-4 border-l-green-800">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-muted-foreground text-sm">{item.sku}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center rounded border">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-[3rem] px-3 py-1 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <Button variant="ghost" size="sm" className="cursor-pointer">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="font-medium">₹ {item.sellingPrice}</p>
              <p className="font-bold text-green-700">
                ₹ {(item.sellingPrice * item.quantity).toFixed(2)}
              </p>
            </div>

            <Button variant="ghost" size="sm" className="cursor-pointer text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
