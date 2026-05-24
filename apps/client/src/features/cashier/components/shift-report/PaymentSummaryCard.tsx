import { Card, CardContent } from "@/components/ui/card";
import { CreditCardIcon, Smartphone, Wallet } from "lucide-react";

type PaymentSummary = {
  type: string;
  totalAmount: number;
  transactionCount: number;
  totalSales: number;
  icon: React.ReactElement;
};

type ShiftData = {
  paymentSummaries: PaymentSummary[];
  totalSales: number;
};

const shiftData: ShiftData = {
  paymentSummaries: [
    {
      type: "CASH",
      totalAmount: 1000,
      transactionCount: 100,
      totalSales: 1000,
      icon: <Wallet />,
    },
    {
      type: "UPI",
      totalAmount: 2000,
      transactionCount: 200,
      totalSales: 2000,
      icon: <Smartphone />,
    },
    {
      type: "CARD",
      totalAmount: 3000,
      transactionCount: 300,
      totalSales: 3000,
      icon: <CreditCardIcon />,
    },
  ],
  totalSales: 6000,
};

export default function PaymentSummaryCard() {
  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">Payment Summary</h2>

          <div className="rounded-lg border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
            ₹ {shiftData.totalSales.toFixed(2)} total sales
          </div>
        </div>

        {/* Payment List */}
        <div className="space-y-3">
          {shiftData.paymentSummaries.map((payment) => (
            <div
              key={payment.type}
              className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            bg-background
            p-3
            transition
            hover:bg-accent/30
          "
            >
              {/* Icon */}
              <div
                className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
            "
              >
                {payment.icon}
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{payment.type}</h3>

                  <span className="text-sm font-bold text-green-700">
                    ₹ {payment.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{payment.transactionCount} transactions</span>

                  <span className="rounded-full bg-muted px-2 py-0.5">
                    {((payment.totalAmount / shiftData.totalSales) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
