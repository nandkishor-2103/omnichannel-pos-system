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

type RecentOrder = {
  id: number;
  orderId: number;
  refundReason: string;
  amount: number;
  icon: React.ReactElement;
};

type ShiftData = {
  refunds: RecentOrder[];
};

const shiftData: ShiftData = {
  refunds: [
    {
      id: 34648483638,
      orderId: 484848483638,
      refundReason:
        "I realized I don't need this item anymore or I found a better alternative elsewhere.",
      amount: 7899,
      icon: <Wallet className="h-4 w-4" />,
    },
    {
      id: 34648483639,
      orderId: 484848483639,
      refundReason: "Product not received.",
      amount: 1250,
      icon: <Smartphone className="h-4 w-4" />,
    },
    {
      id: 34648483640,
      orderId: 484848483640,
      refundReason: "Product damaged during shipping and packaging.",
      amount: 4599,
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      id: 34648483641,
      orderId: 484848483641,
      refundReason: "I find this product is not what I expected. So I want to refund it.",
      amount: 3500,
      icon: <Wallet className="h-4 w-4" />,
    },
  ],
};

export default function RefundsTableCard() {
  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/40 pb-4">
        <CardTitle className="text-base font-semibold">Recent Refunds</CardTitle>

        <div className="rounded-lg border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
          {shiftData.refunds.length} refunds
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="pl-6">Refund</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="text-right pr-6">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {shiftData.refunds.map((refund) => (
              <TableRow key={refund.id} className="transition hover:bg-muted/40">
                {/* Refund ID */}
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full border bg-muted p-2">{refund.icon}</div>

                    <div>
                      <p className="font-medium">REF-{refund.id.toString().slice(-5)}</p>

                      <p className="text-xs text-muted-foreground">Refund Request</p>
                    </div>
                  </div>
                </TableCell>

                {/* Order ID */}
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">
                      ORD-{refund.orderId.toString().slice(-6)}
                    </p>

                    <p className="text-xs text-muted-foreground">Customer Order</p>
                  </div>
                </TableCell>

                {/* Refund Reason */}
                <TableCell className="max-w-[250px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        title="Click to view full refund reason"
                        className="
                          cursor-pointer
                          text-left
                          text-sm
                          font-medium
                          text-primary
                          transition
                          hover:text-primary/80
                          hover:underline
                        "
                      >
                        {refund.refundReason.split(" ").slice(0, 3).join(" ")}
                        ...
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Refund Details</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-5">
                        {/* Top Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded-xl border bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground mb-1">
                              Refund ID
                            </p>

                            <p className="font-semibold">REF-{refund.id}</p>
                          </div>

                          <div className="rounded-xl border bg-muted/30 p-4">
                            <p className="text-xs text-muted-foreground mb-1">Order ID</p>

                            <p className="font-semibold">ORD-{refund.orderId}</p>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="rounded-xl border bg-muted/20 p-4">
                          <p className="mb-2 text-sm text-muted-foreground">
                            Refund Amount
                          </p>

                          <div className="flex items-center text-xl font-bold">
                            <IndianRupeeIcon className="mr-1 h-5 w-5" />
                            {refund.amount.toFixed(2)}
                          </div>
                        </div>

                        {/* Reason */}
                        <div className="rounded-xl border p-4">
                          <h4 className="mb-3 font-semibold">Refund Reason</h4>

                          <p className="leading-7 text-muted-foreground">
                            {refund.refundReason}
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>

                {/* Amount */}
                <TableCell className="pr-6 text-right">
                  <div className="inline-flex items-center rounded-lg border bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-700">
                    <IndianRupeeIcon className="mr-1 h-4 w-4" />
                    {refund.amount.toFixed(2)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
