import { Button } from "@/components/ui/button.tsx";
import { Pause, ShoppingCart, Trash2 } from "lucide-react";

import CartItem from "@/features/cashier/components/cart-section/CartItem";
import CartSummary from "@/features/cashier/components/cart-section/CartSummary";
import HeldOrdersDialog from "@/features/cashier/components/cart-section/HeldOrdersDialog";
import { useState } from "react";

type CartItemType = {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  sellingPrice: number;
};

const cartItems: CartItemType[] = [
  {
    id: 1,
    name: "Organic Cold Pressed Mixed Fruit Juice Bottle",
    sku: "OCPMFJ-004",
    quantity: 2,
    sellingPrice: 15.99,
  },

  {
    id: 2,
    name: "Premium Imported Dark Chocolate Cookies Pack",
    sku: "PIDCCP-005",
    quantity: 1,
    sellingPrice: 22.49,
  },

  {
    id: 3,
    name: "Family Size Extra Crispy Salted Potato Chips",
    sku: "FSECSPC-006",
    quantity: 4,
    sellingPrice: 6.75,
  },
  {
    id: 4,
    name: "Organic Cold Pressed Mixed Fruit Juice Bottle",
    sku: "OCPMFJ-004",
    quantity: 2,
    sellingPrice: 15.99,
  },
  {
    id: 5,
    name: "Premium Imported Dark Chocolate Cookies Pack",
    sku: "PIDCCP-005",
    quantity: 1,
    sellingPrice: 22.49,
  },
  {
    id: 6,
    name: "Family Size Extra Crispy Salted Potato Chips",
    sku: "FSECSPC-006",
    quantity: 4,
    sellingPrice: 6.75,
  },
];

export default function CartSection() {
  const [showHeldOrderDialog, setShowHeldOrderDialog] = useState(false);

  return (
    <>
      <div className="w-2/5 flex flex-col bg-card border-r overflow-hidden">
        {/* Cart Header */}
        <div className="p-4 border-b bg-muted shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="mr-2" />
              Cart ({cartItems.length} items)
            </h2>

            <div className="flex space-x-2">
              <Button
                onClick={() => setShowHeldOrderDialog(true)}
                variant="outline"
                size="sm"
              >
                <Pause className="w-4 h-4 mr-1" /> Held
              </Button>

              <Button variant="outline" size="sm">
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="group relative flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <CartSummary />
      </div>

      <HeldOrdersDialog
        showHeldOrderDialog={showHeldOrderDialog}
        setShowHeldOrderDialog={setShowHeldOrderDialog}
      />
    </>
  );
}
