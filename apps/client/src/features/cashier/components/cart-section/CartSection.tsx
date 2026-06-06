import { Button } from "@/components/ui/button.tsx";
import { Pause, ShoppingCart, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import CartItem from "@/features/cashier/components/cart-section/CartItem";
import CartSummary from "@/features/cashier/components/cart-section/CartSummary";
import HeldOrdersDialog from "@/features/cashier/components/cart-section/HeldOrdersDialog";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectCartItems } from "@/app/store/cart/cartSelectors";
import { clearCart } from "@/app/store/cart/cartSlice";

export default function CartSection() {
  const [showHeldOrderDialog, setShowHeldOrderDialog] = useState(false);

  const cartItems = useAppSelector(selectCartItems);

  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="w-2/5 flex flex-col bg-card border-r overflow-hidden">
        {/* Cart Header */}
        <div className="px-4 py-2.5 border-b bg-muted shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="mr-2" />
              Cart ({cartItems.length} items)
            </h2>

            <div className="flex space-x-2">
              <Button
                className="cursor-pointer"
                onClick={() => setShowHeldOrderDialog(true)}
                variant="outline"
                size="sm"
              >
                <Pause className="w-4 h-4 mr-1" /> Held
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="cursor-pointer"
                    variant="outline"
                    size="sm"
                    disabled={cartItems.length === 0}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Cart?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This will remove all items from the cart. This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      className="cursor-pointer bg-red-600 hover:bg-red-700"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="group relative flex-1 overflow-y-auto p-4">
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>

              <h3 className="text-lg font-semibold">Your cart is empty</h3>

              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Search or select products to start building an order.
              </p>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && <CartSummary />}
      </div>

      <HeldOrdersDialog
        showHeldOrderDialog={showHeldOrderDialog}
        setShowHeldOrderDialog={setShowHeldOrderDialog}
      />
    </>
  );
}
