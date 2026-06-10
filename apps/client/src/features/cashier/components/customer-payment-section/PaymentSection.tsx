import { Button } from "@/components/ui/button";
import { CreditCard, Pause } from "lucide-react";
import { useState } from "react";
import PaymentDialog from "./PaymentDialog";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { holdOrder } from "@/app/store/cart/cartSlice";
import { selectCartItems, selectTotal } from "@/app/store/cart/cartSelectors";


export default function PaymentSection() {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const dispatch = useAppDispatch();
  const totalAmount = useAppSelector(selectTotal);
  const cartItems = useAppSelector(selectCartItems);

  const handleHoldOrder = () => {
    dispatch(holdOrder());
  };

  return (
    <div className="flex flex-1 flex-col p-4 justify-end">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-green-600 dark:text-green-200">
            ₹{totalAmount.toFixed(2)}
          </h1>

          <p className="text-sm text-muted-foreground">Total Amount</p>
        </div>

        <div>
          <div className="mb-3">
            <Button
              onClick={() => setShowPaymentDialog(true)}
              disabled={cartItems.length === 0}
              className="w-full py-4 text-lg font-semibold cursor-pointer"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Process Payment
            </Button>
          </div>

          <div>
            <Button
              variant="outline"
              disabled={cartItems.length === 0}
              className="w-full py-4 text-lg font-semibold cursor-pointer"
              onClick={handleHoldOrder}
            >
              <Pause className="mr-2 h-5 w-5" />
              Hold Order
            </Button>
          </div>
        </div>
      </div>
      {/* Payment Dialog */}
      <PaymentDialog
        showPaymentDialog={showPaymentDialog}
        setShowPaymentDialog={setShowPaymentDialog}
      />
    </div>
  );
}
