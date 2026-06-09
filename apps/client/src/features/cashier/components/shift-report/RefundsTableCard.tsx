import { useAppSelector } from "@/app/store/hooks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CreditCard, IndianRupeeIcon, Smartphone, Wallet } from "lucide-react";

const getRefundMethodIcon = (method: string) => {
  switch (method) {
    case "CASH":
      return <Wallet className="h-4 w-4" />;

    case "UPI":
      return <Smartphone className="h-4 w-4" />;

    case "CARD":
      return <CreditCard className="h-4 w-4" />;

    default:
      return <Wallet className="h-4 w-4" />;
  }
};

export default function RefundsTableCard() {
  const currentShift = useAppSelector((state) => state.shiftReport.currentShift);

  const today = new Date().toDateString();

  const refunds = [...(currentShift?.refunds ?? [])]
    .filter((refund) => new Date(refund.createdAt).toDateString() === today)
    .sort((a, b) => b.refundAmount - a.refundAmount)
    .slice(0, 5);

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/40 pb-4">
        <CardTitle className="text-base font-semibold">Recent Refunds</CardTitle>

        <div className="rounded-lg border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
          {refunds.length} Refunds
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {refunds.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-muted-foreground">No refunds available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="pl-6">Refund</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="pr-6 text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {refunds.map((refund) => (
                <TableRow key={refund.id} className="transition hover:bg-muted/40">
                  {/* Refund ID */}
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full border bg-muted p-2">
                        {getRefundMethodIcon(refund.refundMethod)}
                      </div>

                      <div>
                        <p className="font-medium">
                          REF-{refund.id.slice(-5).toUpperCase()}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {new Date(refund.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Order */}
                  <TableCell>
                    <p className="font-medium">
                      ORD-{refund.orderId.slice(-6).toUpperCase()}
                    </p>
                  </TableCell>

                  {/* Reason */}
                  <TableCell className="max-w-[250px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="
                            cursor-pointer
                            text-left
                            text-sm
                            font-medium
                            text-primary
                            hover:underline
                          "
                        >
                          {refund.reason.length > 25
                            ? `${refund.reason.slice(0, 25)}...`
                            : refund.reason}
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Refund Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border p-4">
                              <p className="mb-1 text-xs text-muted-foreground">
                                Refund ID
                              </p>

                              <p className="font-semibold">REF-{refund.id}</p>
                            </div>

                            <div className="rounded-xl border p-4">
                              <p className="mb-1 text-xs text-muted-foreground">
                                Order ID
                              </p>

                              <p className="font-semibold">ORD-{refund.orderId}</p>
                            </div>
                          </div>

                          <div className="rounded-xl border p-4">
                            <p className="mb-2 text-sm text-muted-foreground">
                              Refund Amount
                            </p>

                            <div className="flex items-center text-xl font-bold text-red-600">
                              <IndianRupeeIcon className="mr-1 h-5 w-5" />
                              {refund.refundAmount.toFixed(2)}
                            </div>
                          </div>

                          <div className="rounded-xl border p-4">
                            <h4 className="mb-2 font-semibold">Refund Reason</h4>

                            <p className="text-muted-foreground">{refund.reason}</p>
                          </div>

                          <div className="rounded-xl border p-4">
                            <h4 className="mb-2 font-semibold">Cashier</h4>

                            <p>{refund.cashierName}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>

                  {/* Method */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getRefundMethodIcon(refund.refundMethod)}

                      <span className="text-sm font-medium">{refund.refundMethod}</span>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="pr-6 text-right">
                    <div className="inline-flex items-center rounded-lg border bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-600">
                      <IndianRupeeIcon className="mr-1 h-4 w-4" />
                      {refund.refundAmount.toFixed(2)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
