import { removeFromCart, updateCartItemQuantity } from "@/app/store/cart/cartSlice";
import { useAppDispatch } from "@/app/store/hooks";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Minus, Plus, Trash2 } from "lucide-react";

type CartItemType = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
};

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleUpdateCartItemQuantity = (quantity: number) => {
    dispatch(
      updateCartItemQuantity({
        id: item.id,
        quantity: item.quantity + quantity,
      })
    );
  };
  return (
    <Card className="border-l-4 border-l-green-800 hover:scale-103 transition-transform duration-300 hover:cursor-pointer hover:bg-muted">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-muted-foreground text-sm">{item.sku}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center rounded border">
              <Button
                onClick={() => handleUpdateCartItemQuantity(-1)}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-[3rem] px-3 py-1 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <Button
                onClick={() => handleUpdateCartItemQuantity(1)}
                variant="ghost"
                size="sm"
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-right">
              <p className="font-medium">₹ {item.sellingPrice}</p>
              <p className="font-bold text-green-700">
                ₹ {(item.sellingPrice * item.quantity).toFixed(2)}
              </p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove Item</AlertDialogTitle>

                  <AlertDialogDescription>
                    Are you sure you want to remove{" "}
                    <span className="font-medium">{item.name}</span> from the cart?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    className="cursor-pointer bg-red-600 hover:bg-red-700"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
