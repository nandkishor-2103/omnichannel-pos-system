import { Tag } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type DiscountType = "percentage" | "fixed";

type Discount = {
  value: number;
  type: DiscountType;
};

export default function DiscountSection() {
  const [discount, setDiscount] = useState<Discount>({
    value: 0,
    type: "percentage",
  });

  const isFixedDiscount = discount.type === "fixed";

  function handleDiscountChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = Number(e.target.value);

    setDiscount({ ...discount, value });
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
    {isFixedDiscount ? "$" : "%"}
  </span>

  <Input
    className={isFixedDiscount ? "pr-8" : "pr-8"}
    placeholder="Enter discount amount"
    type="number"
    value={discount.value}
    onChange={handleDiscountChange}
  />

</div>

        <div className="flex gap-5">
          <Button
            className="flex-1 cursor-pointer"
            onClick={() =>
              setDiscount({
                ...discount,
                type: "percentage",
              })
            }
            variant={discount.type === "percentage" ? "default" : "outline"}
          >
            %
          </Button>

          <Button
            className="flex-1 cursor-pointer"
            onClick={() =>
              setDiscount({
                ...discount,
                type: "fixed",
              })
            }
            variant={discount.type === "fixed" ? "default" : "outline"}
          >
            $
          </Button>
        </div>
      </div>
    </div>
  );
}
