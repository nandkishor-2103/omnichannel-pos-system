import { Separator } from "@/components/ui/separator.tsx";

export default function CartSummary() {
  return (
    <div className="border-t bg-muted p-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{(700.49).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (18% GST):</span>
          <span>₹{(126.09).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="text-red-600">- ₹{(40).toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total:</span>
          <span className="text-green-600">₹{(886.5).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
