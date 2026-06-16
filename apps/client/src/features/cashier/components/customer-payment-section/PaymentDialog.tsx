import {
  selectCartItems,
  selectNote,
  selectSelectedCustomer,
  selectTotal,
} from "@/app/store/cart/cartSelectors";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { createOrder } from "@/app/store/order/orderThunk";

import {
  createOrderPaymentOrder,
  verifyOrderPayment,
} from "@/app/store/order-payment/orderPaymentThunk";

import { resetOrder } from "@/app/store/cart/cartSlice";

import { getProductsByStore } from "@/app/store/product/productThunk";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { CreditCard, IndianRupee, Smartphone, Wallet } from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

import { loadRazorpay } from "../../utils/loadRazorpay";

import type { PaymentType } from "../../types/order";

import type {
  RazorpayOptions,
  RazorpaySuccessResponse,
} from "../../types/razorpay.types";

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

  const orderLoading = useAppSelector((state) => state.order.loading);

  const { creatingOrder, verifyingPayment } = useAppSelector(
    (state) => state.orderPayment
  );

  const selectedCustomer = useAppSelector(selectSelectedCustomer);

  const cart = useAppSelector(selectCartItems);

  const note = useAppSelector(selectNote);

  const user = useAppSelector((state) => state.user.userProfile);

  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const createOrderAfterPayment = async (paymentInfo?: {
    razorpayOrderId?: string;

    razorpayPaymentId?: string;

    razorpaySignature?: string;

    paymentStatus?: "SUCCESS";
  }) => {
    if (!selectedCustomer || !selectedPaymentMethod) {
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

      ...paymentInfo,
    };

    const resultAction = await dispatch(createOrder(orderData));

    if (createOrder.fulfilled.match(resultAction)) {
      dispatch(resetOrder());

      if (user?.store?.id) {
        dispatch(getProductsByStore(user.store.id));
      }

      setShowPaymentDialog(false);

      setSelectedPaymentMethod(null);
    }
  };

  const handleCreateOrder = async () => {
    if (!currentShift) {
      toast.warning("Please start your shift before creating an order");
      return;
    }

    if (currentShift.status === "PAUSED") {
      toast.warning("Please resume your shift before creating an order");
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

    // CASH PAYMENT
    if (selectedPaymentMethod === "CASH") {
      await createOrderAfterPayment({
        paymentStatus: "SUCCESS",
      });

      return;
    }

    try {
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        toast.error("Failed to load Razorpay");
        return;
      }

      const paymentOrder = await dispatch(
        createOrderPaymentOrder({
          amount: totalAmount,
        })
      ).unwrap();

      const { orderId, amount, currency, key } = paymentOrder.payload;

      const options: RazorpayOptions = {
        key,

        amount,

        currency,

        order_id: orderId,

        name: "POS System",

        description: "Order Payment",

        handler: async (response: RazorpaySuccessResponse) => {
          try {
            await dispatch(
              verifyOrderPayment({
                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              })
            ).unwrap();

            await createOrderAfterPayment({
              razorpayOrderId: response.razorpay_order_id,

              razorpayPaymentId: response.razorpay_payment_id,

              razorpaySignature: response.razorpay_signature,

              paymentStatus: "SUCCESS",
            });
          } catch (error) {
            console.error(error);

            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#16a34a",
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
          },
        },
      };

      const Razorpay = (
        window as typeof window & {
          Razorpay?: new (options: RazorpayOptions) => {
            open: () => void;
          };
        }
      ).Razorpay;

      if (!Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const razorpay = new Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error("Failed to initiate payment");
    }
  };

  const loading = orderLoading || creatingOrder || verifyingPayment;

  return (
    <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Options</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="text-center">
            <h1 className="flex items-center justify-center text-lg font-bold text-green-600 dark:text-green-200">
              <IndianRupee className="h-4 w-4" />
              {totalAmount.toFixed(2)}
            </h1>

            <p className="text-sm text-muted-foreground">Amount to pay</p>
          </div>

          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedPaymentMethod === option.key ? "default" : "outline"}
                className={`w-full cursor-pointer justify-center ${
                  selectedPaymentMethod !== option.key
                    ? "border border-muted-foreground/30 bg-transparent hover:bg-muted"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                onClick={() => setSelectedPaymentMethod(option.key)}
              >
                <option.icon className="mr-2 h-4 w-4" />
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
            {loading ? <LoadingSpinner size={16} text="Processing..." /> : "Finish Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
