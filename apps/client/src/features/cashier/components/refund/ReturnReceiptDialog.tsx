import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PrinterIcon } from "lucide-react";

import type { Order } from "../../types/refund";

interface Props {
  selectedOrder: Order;

  showReturnReceiptDialog: boolean;

  setShowReturnReceiptDialog: (value: boolean) => void;
}

export default function ReturnReceiptDialog({
  selectedOrder,
  showReturnReceiptDialog,
  setShowReturnReceiptDialog,
}: Props) {
  return (
    <Dialog open={showReturnReceiptDialog} onOpenChange={setShowReturnReceiptDialog}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Return Receipt</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">D-Mart Branch</h2>

              <p className="text-sm text-muted-foreground">
                123 Main Street, Bhubaneswar, Odisha
              </p>

              <p className="text-sm text-muted-foreground">Tel: 0371-234567890</p>
            </div>

            <div className="rounded-xl border p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Original Order</p>

                  <p className="font-semibold">#{selectedOrder.id}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Date</p>

                  <p className="font-semibold">{new Date().toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>

                  <p className="font-semibold">{selectedOrder.customer.fullName}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>

                    <TableHead>Qty</TableHead>

                    <TableHead>Price</TableHead>

                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-14 w-14 rounded-xl border object-cover"
                          />

                          <div>
                            <p className="font-medium">{item.product.name}</p>

                            <p className="text-xs text-muted-foreground">
                              SKU: {item.product.sku}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{item.quantity}</TableCell>

                      <TableCell>₹{item.product.sellingPrice.toFixed(2)}</TableCell>

                      <TableCell className="text-right font-semibold">
                        ₹{(item.product.sellingPrice * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="rounded-xl border bg-muted/40 p-5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Refund</span>

                <span className="text-2xl font-bold">
                  ₹{selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="cursor-pointer">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print & Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
