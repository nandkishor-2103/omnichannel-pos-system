import { ChevronLeftCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Order } from "../../types/refund";

interface Props {
  selectedOrder: Order;
  onViewOrderDetails: (order: Order | null) => void;
}

export default function OrderDetailsSection({
  selectedOrder,
  onViewOrderDetails,
}: Props) {
  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => onViewOrderDetails(null)}
      >
        <ChevronLeftCircle className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Order #{selectedOrder.id}</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {selectedOrder.createdAt}
              </p>
            </div>

            <Badge variant="outline">{selectedOrder.paymentType}</Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Customer Name</p>

              <h3 className="font-semibold">{selectedOrder.customer.fullName}</h3>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>

              <h3 className="font-semibold">{selectedOrder.customer.phone}</h3>
            </div>
          </div>

          <div className="mt-6 rounded-xl border bg-muted/40 p-4">
            <div className="flex items-center justify-between">
              <span>Total Items</span>

              <span className="font-semibold">{selectedOrder.items.length}</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span>Order Total</span>

              <span className="text-lg font-bold">
                ₹{selectedOrder.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="border-b p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Order Items</h2>

              <span className="text-sm text-muted-foreground">
                {selectedOrder.items.length} Items
              </span>
            </div>
          </div>

          <div className="overflow-auto">
            <Table>
              <TableHeader>
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
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-xl border object-cover"
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
        </CardContent>
      </Card>
    </div>
  );
}
