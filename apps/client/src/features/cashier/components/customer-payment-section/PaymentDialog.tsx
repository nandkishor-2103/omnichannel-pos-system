import {
  selectCartItems,
  selectNote,
  selectSelectedCustomer,
  selectTotal,
} from "@/app/store/cart/cartSelectors";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { createOrder } from "@/app/store/order/orderThunk";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard, IndianRupee, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { PaymentType } from "../../types/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { resetOrder } from "@/app/store/cart/cartSlice";
import { getProductsByStore } from "@/app/store/product/productThunk";

type PaymentOption = {
  id: number;
  name: string;
  key: PaymentType;
  icon: React.ElementType;
};

const paymentOptions: PaymentOption[] = [
  {
    id: 1,
    name: "CARD",
    key: "CARD",
    icon: CreditCard,
  },
  {
    id: 2,
    name: "UPI",
    key: "UPI",
    icon: Smartphone,
  },
  {
    id: 3,
    name: "CASH",
    key: "CASH",
    icon: Wallet,
  },
];

type PaymentDialogProps = {
  showPaymentDialog: boolean;
  setShowPaymentDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PaymentDialog({
  showPaymentDialog,
  setShowPaymentDialog,
}: PaymentDialogProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentType | null>(
    null
  );

  const dispatch = useAppDispatch();

  const totalAmount = useAppSelector(selectTotal);
  const loading = useAppSelector((state) => state.order.loading);

  const selectedCustomer = useAppSelector(selectSelectedCustomer);
  const cart = useAppSelector(selectCartItems);
  const note = useAppSelector(selectNote);
  const user = useAppSelector((state) => state.user.userProfile);
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const handleCreateOrder = async () => {
    if (!currentShift) {
      toast.error("Please start your shift before creating an order");
      return;
    }

    if (currentShift.status === "PAUSED") {
      toast.error("Please resume your shift before creating an order");
      return;
    }

    if (!selectedCustomer) {
      toast.warning("Please select a customer before creating the order");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.warning("Please select a payment method");
      return;
    }

    const orderData = {
      totalAmount,
      customerId: selectedCustomer._id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.sellingPrice,
        total: item.sellingPrice * item.quantity,
      })),
      paymentType: selectedPaymentMethod,
      note,
    };

    const resultAction = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(resetOrder());

      if (user?.store?.id) {
        dispatch(getProductsByStore(user.store.id));
      }

      toast.success("Order created successfully");

      setShowPaymentDialog(false);

      setSelectedPaymentMethod(null);
    }
  };

  return (
    <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="text-center">
            <h1 className="flex items-center justify-center text-lg font-bold text-green-600 dark:text-green-200">
              <IndianRupee className="h-4 w-4 " />
              {totalAmount.toFixed(2)}
            </h1>

            <p className="text-sm text-muted-foreground">Amount to pay</p>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedPaymentMethod === option.key ? "default" : "outline"}
                className={`w-full cursor-pointer justify-center ${selectedPaymentMethod !== option.key ? "border border-muted-foreground/30 bg-transparent hover:bg-muted" : "bg-green-600 hover:bg-green-700 text-white"}`}
                onClick={() => setSelectedPaymentMethod(option.key)}
              >
                <option.icon className="h-4 w-4 mr-2 inline-block" />
                {option.name}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            className="cursor-pointer hover:bg-green-800"
            onClick={handleCreateOrder}
          >
            {loading ? (
              <LoadingSpinner size={16} text="Creating Order..." />
            ) : (
              "Finish Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
