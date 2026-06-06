import { Tag } from "lucide-react";
import type { Discount } from "@/app/store/cart/cartTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectDiscount } from "@/app/store/cart/cartSelectors";
import { setDiscount } from "@/app/store/cart/cartSlice";

export default function DiscountSection() {
  const discount = useAppSelector(selectDiscount);
  
  const dispatch = useAppDispatch();

  const isFixedDiscount = discount.type === "fixed";

  function handleDiscountChange(e: React.ChangeEvent<HTMLInputElement>): void {
    dispatch(
      setDiscount({
        ...discount,
        value: Number(e.target.value) || 0,
      })
    );
  }

  return (
    <div className="border-b p-4">
      <h2 className="mb-3 flex items-center text-lg font-semibold">
        <Tag className="mr-2 h-5 w-5" />
        Discount
      </h2>

      <div className="space-y-3">
        <div className="relative">
          <span
            className={`
                absolute
                top-1/2
                -translate-y-1/2
                text-sm
                text-muted-foreground
                z-10
                ${isFixedDiscount ? "right-3" : "right-3"}
                `}
          >
            {isFixedDiscount ? "₹" : "%"}
          </span>

          <Input
            type="number"
            className="pr-8"
            placeholder={isFixedDiscount ? "e.g. ₹100" : "e.g. 10%"}
            value={discount.value === 0 ? "" : discount.value}
            onChange={handleDiscountChange}
          />
        </div>

        <div className="flex gap-5">
          <Button
            className="flex-1 cursor-pointer"
            onClick={() =>
              dispatch(
                setDiscount({
                  ...discount,
                  type: "percentage",
                })
              )
            }
            variant={discount.type === "percentage" ? "default" : "outline"}
          >
            %
          </Button>

          <Button
            className="flex-1 cursor-pointer"
            onClick={() =>
              dispatch(
                setDiscount({
                  ...discount,
                  type: "fixed",
                })
              )
            }
            variant={discount.type === "fixed" ? "default" : "outline"}
          >
            ₹
          </Button>
        </div>
      </div>
    </div>
  );
}
