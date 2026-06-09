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

// import type { Order } from "../../types/refund";
import type { Order } from "@/app/store/order/orderTypes";
import { useAppSelector } from "@/app/store/hooks";

interface Props {
  selectedOrder: Order;

  showReturnReceiptDialog: boolean;

  setShowReturnReceiptDialog: (value: boolean) => void;

  onComplete: () => void;
}

export default function ReturnReceiptDialog({
  selectedOrder,
  showReturnReceiptDialog,
  setShowReturnReceiptDialog,
  onComplete,
}: Props) {
  const branch = useAppSelector((state) => state.branch.branch);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) return;

    const receiptHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Refund Receipt</title>

        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }

          body {
            width: 80mm;
            margin: 0 auto;
            padding: 10px;
            font-family: Arial, sans-serif;
            color: #111;
          }

          .center {
            text-align: center;
          }

          .store-name {
            font-size: 22px;
            font-weight: 700;
          }

          .divider {
            border-top: 1px dashed #000;
            margin: 10px 0;
          }

          .row {
            display: flex;
            justify-content: space-between;
            margin: 4px 0;
            font-size: 12px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }

          th {
            text-align: left;
            border-bottom: 1px solid #ddd;
            padding: 6px 0;
            font-size: 12px;
          }

          td {
            padding: 6px 0;
            font-size: 12px;
          }

          .right {
            text-align: right;
          }

          .total {
            font-size: 18px;
            font-weight: bold;
          }

          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
          }

          @media print {
            body {
              width: 80mm;
            }
          }
        </style>
      </head>

      <body>
        <div class="center">
          <div class="store-name">${branch?.name ?? ""}</div>

          <div>${branch?.address ?? ""}</div>

          <div>${branch?.phone ?? ""}</div>

          <div class="divider"></div>

          <h3>REFUND RECEIPT</h3>
        </div>

        <div class="divider"></div>

        <div class="row">
          <span>Order ID</span>
          <span>#${selectedOrder.id}</span>
        </div>

        <div class="row">
          <span>Date</span>
          <span>${new Date().toLocaleString()}</span>
        </div>

        <div class="row">
          <span>Customer</span>
          <span>${selectedOrder.customer.fullName}</span>
        </div>

        <div class="divider"></div>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th class="right">Amount</th>
            </tr>
          </thead>

          <tbody>
            ${selectedOrder.items
              .map(
                (item) => `
                  <tr>
                    <td>${item.product?.name ?? ""}</td>
                    <td>${item.quantity}</td>
                    <td class="right">
                      ₹${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>

        <div class="divider"></div>

        <div class="row total">
          <span>Total Refund</span>
          <span>₹${selectedOrder.totalAmount.toFixed(2)}</span>
        </div>

        <div class="divider"></div>

        <div class="footer">
          <p>Refund Processed Successfully</p>
          <p>Thank You</p>
        </div>

        <script>
          window.onload = function() {
            window.print();
            window.onafterprint = function() {
              window.close();
            };
          };
        </script>
      </body>
    </html>
  `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();

    setShowReturnReceiptDialog(false);
    onComplete();
  };

  return (
    <Dialog open={showReturnReceiptDialog} onOpenChange={setShowReturnReceiptDialog}>
      <DialogContent className="min-w-2xl">
        <DialogHeader>
          <DialogTitle>Return Receipt</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">{branch?.name}</h2>

              <p className="text-sm text-muted-foreground">{branch?.address}</p>

              <p className="text-sm text-muted-foreground">Tel: {branch?.phone}</p>
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
                    <TableRow key={item.product?.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="h-14 w-14 rounded-xl border object-cover"
                          />

                          <div>
                            <p className="font-medium">{item.product?.name}</p>

                            <p className="text-xs text-muted-foreground">
                              SKU: {item.product?.sku}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>{item.quantity}</TableCell>

                      <TableCell>
                        ₹{(item.product?.sellingPrice ?? item.price).toFixed(2)}
                      </TableCell>

                      <TableCell className="text-right font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
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
          <Button onClick={handlePrint} className="cursor-pointer">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print & Complete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
