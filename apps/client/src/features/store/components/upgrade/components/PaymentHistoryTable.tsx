import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import type { SubscriptionPayment } from "@/app/store/subscription-payment/subscriptionPaymentTypes";

interface PaymentHistoryTableProps {
  payments: SubscriptionPayment[];
}

export default function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  if (!payments.length) {
    return (
      <div className="rounded-xl border p-6 text-center text-muted-foreground">
        No payment history found.
      </div>
    );
  }

  return (
    <div className="rounded-xl border">
      <div className="border-b p-4">
        <h3 className="font-semibold">Payment History</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Payment ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid On</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment._id}>
              <TableCell className="font-medium">
                {payment.razorpayPaymentId ?? payment.razorpayOrderId}
              </TableCell>

              <TableCell>₹{payment.amount.toLocaleString()}</TableCell>

              <TableCell>
                <Badge
                  variant={
                    payment.status === "SUCCESS"
                      ? "default"
                      : payment.status === "FAILED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {payment.status}
                </Badge>
              </TableCell>

              <TableCell>
                {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
