import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  totalSales: number;
  paymentMethodsCount: number;
};

export default function SalesSummaryCards({ totalSales, paymentMethodsCount }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>

          <CardTitle className="text-3xl">
            ₹{totalSales.toLocaleString("en-IN")}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Payment Methods</CardDescription>

          <CardTitle className="text-3xl">{paymentMethodsCount}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
