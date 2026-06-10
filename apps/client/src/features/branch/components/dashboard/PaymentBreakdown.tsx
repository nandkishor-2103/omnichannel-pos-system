import { useAppSelector } from "@/app/store/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Banknote, CreditCard, Smartphone, TrendingUp } from "lucide-react";

type PaymentType = "CASH" | "CARD" | "UPI";

const getPaymentIcon = (type: PaymentType) => {
  switch (type) {
    case "CASH":
      return <Banknote className="h-5 w-5 text-emerald-500" />;

    case "CARD":
      return <CreditCard className="h-5 w-5 text-blue-500" />;

    case "UPI":
      return <Smartphone className="h-5 w-5 text-violet-500" />;

    default:
      return <TrendingUp className="h-5 w-5 text-primary" />;
  }
};

const getProgressColor = (type: PaymentType) => {
  switch (type) {
    case "CASH":
      return "bg-emerald-500";

    case "CARD":
      return "bg-blue-500";

    case "UPI":
      return "bg-violet-500";

    default:
      return "bg-primary";
  }
};

export default function PaymentBreakdown() {
  const paymentBreakdown = useAppSelector(
    (state) => state.branchAnalytics.paymentBreakdown
  );
  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-xl font-semibold tracking-tight">
          Payment Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {paymentBreakdown &&
            paymentBreakdown.length > 0 &&
            paymentBreakdown.map((payment, index) => (
              <div
                key={index}
                className="
                rounded-2xl border border-border/50
                bg-muted/20 p-4
                transition-all duration-300
                hover:shadow-md
              "
              >
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <div
                      className="
                      flex h-11 w-11 items-center justify-center
                      rounded-xl bg-background shadow-sm
                    "
                    >
                      {getPaymentIcon(payment.type)}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {payment.type}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        {payment.transactionCount} Transactions
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-foreground">
                      ₹{payment.totalAmount.toLocaleString()}
                    </h3>

                    <p className="text-xs font-medium text-muted-foreground">
                      {payment.percentage}%
                    </p>
                  </div>
                </div>

                {/* PROGRESS */}
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getProgressColor(payment.type)}`}
                      style={{
                        width: `${payment.percentage}%`,
                      }}
                    />
                  </div>
                </div>
              </div> /* : (
            <div className="text-center text-gray-400">
              {loading ? "Loading payment breakdown..." : "No data available"}
            </div>
          ) */
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
