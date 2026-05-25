import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Order } from "../../types/order";

interface OrderItemTableProps {
  selectedOrder: Order;
}

export default function OrderItemTable({ selectedOrder }: OrderItemTableProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Order Items</h2>

          <span className="text-sm text-muted-foreground">
            {selectedOrder.items.length} Items
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow>
                <TableHead>Product</TableHead>

                <TableHead>Quantity</TableHead>

                <TableHead>Price</TableHead>

                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {selectedOrder.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-14 w-14 rounded-xl border object-cover"
                      />

                      <div className="flex flex-col">
                        <span className="font-medium">{item.product.name}</span>

                        <span className="text-xs text-muted-foreground">
                          SKU: {item.product.sku}
                        </span>
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
      </CardContent>
    </Card>
  );
}