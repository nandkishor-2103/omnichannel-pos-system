import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, IndianRupee, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";

type PaymentOption = {
  id: number;
  name: string;
  key: string;
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("CARD");

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
              899
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
      </DialogContent>
    </Dialog>
  );
}
