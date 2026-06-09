import { CreditCardIcon, Smartphone, Wallet } from "lucide-react";

import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent } from "@/components/ui/card";

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "CASH":
      return <Wallet className="h-5 w-5" />;

    case "UPI":
      return <Smartphone className="h-5 w-5" />;

    case "CARD":
      return <CreditCardIcon className="h-5 w-5" />;

    default:
      return <Wallet className="h-5 w-5" />;
  }
};

export default function PaymentSummaryCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const paymentSummaries = [...(currentShift?.paymentSummaries ?? [])].sort(
    (a, b) => b.totalAmount - a.totalAmount
  );

  const totalSales = currentShift?.totalSales ?? 0;

  return (
    <Card className="overflow-hidden border-none shadow-sm">
      <CardContent className="p-5">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Payment Summary</h2>

            <p className="text-xs text-muted-foreground">
              Sales breakdown by payment methods
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Total Sales
            </p>

            <p className="text-sm font-bold">₹{totalSales.toFixed(2)}</p>
          </div>
        </div>

        {/* Empty State */}
        {paymentSummaries.length === 0 ? (
          <div className="rounded-xl border py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No payment transactions available
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentSummaries.map((payment) => (
              <div
                key={payment.type}
                className="
                  rounded-xl
                  border
                  bg-background
                  p-4
                  transition-all
                  hover:bg-accent/20
                "
              >
                <div className="mb-3 flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-primary/10
                      text-primary
                    "
                  >
                    {getPaymentIcon(payment.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="font-semibold">{payment.type}</h3>

                      <span className="text-sm font-bold text-green-600">
                        ₹{payment.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {payment.transactionCount} transaction
                        {payment.transactionCount > 1 ? "s" : ""}
                      </span>

                      <span className="font-medium">
                        {payment.percentage.toFixed(2)}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{
                          width: `${payment.percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
