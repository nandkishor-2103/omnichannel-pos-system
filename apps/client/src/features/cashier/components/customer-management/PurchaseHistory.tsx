import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarIcon, IndianRupeeIcon } from "lucide-react";

type OrderItem = {
  id: number;
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
};

type PurchaseHistoryType = {
  id: number;
  createdAt: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  items: OrderItem[];
};

const orders: PurchaseHistoryType[] = [
  {
    id: 163573673,
    createdAt: "2023-08-15 10:00 AM",
    totalAmount: 100,
    status: "Completed",
    paymentMethod: "CASH",
    items: [
      {
        id: 1635736731,
        product: {
          name: "Cabbage",
          price: 10,
        },
        quantity: 2,
        price: 20,
      },
    ],
  },
  {
    id: 163573674,
    createdAt: "2023-08-16 11:00 AM",
    totalAmount: 1200,
    status: "Completed",
    paymentMethod: "CASH",
    items: [
      {
        id: 1635736741,
        product: {
          name: "Carrot",
          price: 20,
        },
        quantity: 3,
        price: 60,
      },
    ],
  },
  {
    id: 163573675,
    createdAt: "2023-08-17 12:00 PM",
    totalAmount: 1500,
    status: "Completed",
    paymentMethod: "CARD",
    items: [
      {
        id: 1635736751,
        product: {
          name: "Onion",
          price: 30,
        },
        quantity: 4,
        price: 140,
      },
    ],
  },

  {
    id: 163573676,
    createdAt: "2023-08-18 03:00 PM",
    totalAmount: 1800,
    status: "Completed",
    paymentMethod: "UPI",
    items: [
      {
        id: 1635736761,
        product: {
          name: "Potato",
          price: 40,
        },
        quantity: 4,
        price: 40,
      },
    ],
  },
];

export default function PurchaseHistory() {
  return (
    <div className="border-t p-2">
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>

        <CardContent className="max-h-[calc(100vh-478px)] overflow-y-auto pr-2">
          <div className="space-y-2">
            {orders.map((order) => (
              <div key={order.id} className="rounded-lg border p-2">
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <h3 className="mb-2 font-medium">Order ID: #{order.id}</h3>

                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {order.createdAt}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mb-1 flex items-center">
                      <IndianRupeeIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                      {order.totalAmount}
                    </div>

                    <Badge>{order.status}</Badge>
                  </div>
                </div>

                <div className="mb-1 text-sm text-muted-foreground">
                  Payment Method: {order.paymentMethod}
                </div>

                <div className="border-t pt-2">
                  <h4 className="mb-1 text-sm font-medium">Item:</h4>

                  <div className="space-y-1">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-muted-foreground">{item.product.name}</span>

                        <span>
                          {item.quantity} × {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
