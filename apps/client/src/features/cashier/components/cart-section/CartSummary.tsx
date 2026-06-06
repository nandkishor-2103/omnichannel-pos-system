import {
  selectDiscountAmount,
  selectSubtotal,
  selectTax,
  selectTotal,
} from "@/app/store/cart/cartSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { Separator } from "@/components/ui/separator.tsx";

export default function CartSummary() {
  const subTotal = useAppSelector(selectSubtotal);
  const tax = useAppSelector(selectTax);
  const totalAmount = useAppSelector(selectTotal);
  const discount = useAppSelector(selectDiscountAmount);

  return (
    <div className="border-t bg-muted p-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{subTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (18% GST):</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="text-red-600">- ₹{discount.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
