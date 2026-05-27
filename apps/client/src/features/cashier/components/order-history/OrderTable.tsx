import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EyeIcon, PrinterIcon } from "lucide-react";

import type { Order } from "../../types/order";

interface OrderTableProps {
  onViewOrderDetails: (order: Order) => void;
}

const orders: Order[] = [
  {
    id: 234436812,
    createdAt: "June 20, 2024, 10:30 AM",
    customer: {
      fullName: "John Doe",
      phone: "+91 98765 43210",
    },
    totalAmount: 2499,
    paymentType: "CASH",
    status: "COMPLETED",
    items: [
      {
        id: 121,
        product: {
          image:
            "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=1200&auto=format&fit=crop",
          name: "Broccoli",
          sellingPrice: 249.99,
          sku: "BRCL-001",
        },
        quantity: 2,
      },
    ],
  },

  {
    id: 234436813,
    createdAt: "June 21, 2024, 02:15 PM",
    customer: {
      fullName: "Jane Smith",
      phone: "+91 98765 43211",
    },
    totalAmount: 1499,
    paymentType: "CARD",
    status: "PENDING",
    items: [
      {
        id: 122,
        product: {
          image:
            "https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=1200&auto=format&fit=crop",
          name: "Carrot",
          sellingPrice: 149.99,
          sku: "CRRT-001",
        },
        quantity: 3,
      },
    ],
  },

  {
    id: 234436814,
    createdAt: "June 21, 2024, 04:40 PM",
    customer: {
      fullName: "Michael Brown",
      phone: "+91 98765 43212",
    },
    totalAmount: 3299,
    paymentType: "UPI",
    status: "COMPLETED",
    items: [
      {
        id: 123,
        product: {
          image:
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1200&auto=format&fit=crop",
          name: "Tomato",
          sellingPrice: 99.99,
          sku: "TMTO-001",
        },
        quantity: 5,
      },
    ],
  },

  {
    id: 234436815,
    createdAt: "June 22, 2024, 09:10 AM",
    customer: {
      fullName: "Emily Johnson",
      phone: "+91 98765 43213",
    },
    totalAmount: 1899,
    paymentType: "CASH",
    status: "COMPLETED",
    items: [
      {
        id: 124,
        product: {
          image:
            "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?q=80&w=1200&auto=format&fit=crop",
          name: "Potato",
          sellingPrice: 59.99,
          sku: "PTTO-001",
        },
        quantity: 10,
      },
    ],
  },

  {
    id: 234436816,
    createdAt: "June 22, 2024, 11:45 AM",
    customer: {
      fullName: "David Wilson",
      phone: "+91 98765 43214",
    },
    totalAmount: 4599,
    paymentType: "CARD",
    status: "PENDING",
    items: [
      {
        id: 125,
        product: {
          image:
            "https://images.unsplash.com/photo-1582515073490-39981397c445?q=80&w=1200&auto=format&fit=crop",
          name: "Onion",
          sellingPrice: 89.99,
          sku: "ONON-001",
        },
        quantity: 6,
      },
    ],
  },

  {
    id: 234436817,
    createdAt: "June 22, 2024, 01:30 PM",
    customer: {
      fullName: "Sophia Taylor",
      phone: "+91 98765 43215",
    },
    totalAmount: 2199,
    paymentType: "UPI",
    status: "COMPLETED",
    items: [
      {
        id: 126,
        product: {
          image:
            "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop",
          name: "Capsicum",
          sellingPrice: 199.99,
          sku: "CPSC-001",
        },
        quantity: 4,
      },
    ],
  },

  {
    id: 234436818,
    createdAt: "June 22, 2024, 03:05 PM",
    customer: {
      fullName: "Daniel Anderson",
      phone: "+91 98765 43216",
    },
    totalAmount: 5599,
    paymentType: "CARD",
    status: "CANCELLED",
    items: [
      {
        id: 127,
        product: {
          image:
            "https://images.unsplash.com/photo-1603048719539-9ecb4b86d0a1?q=80&w=1200&auto=format&fit=crop",
          name: "Cauliflower",
          sellingPrice: 179.99,
          sku: "CLFL-001",
        },
        quantity: 7,
      },
    ],
  },

  {
    id: 234436819,
    createdAt: "June 23, 2024, 08:50 AM",
    customer: {
      fullName: "Olivia Martinez",
      phone: "+91 98765 43217",
    },
    totalAmount: 1799,
    paymentType: "CASH",
    status: "COMPLETED",
    items: [
      {
        id: 128,
        product: {
          image:
            "https://images.unsplash.com/photo-1566383444833-43b8f7fda9c8?q=80&w=1200&auto=format&fit=crop",
          name: "Spinach",
          sellingPrice: 79.99,
          sku: "SPNC-001",
        },
        quantity: 8,
      },
    ],
  },

  {
    id: 234436820,
    createdAt: "June 23, 2024, 10:20 AM",
    customer: {
      fullName: "James Thomas",
      phone: "+91 98765 43218",
    },
    totalAmount: 6299,
    paymentType: "UPI",
    status: "PENDING",
    items: [
      {
        id: 129,
        product: {
          image:
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=1200&auto=format&fit=crop",
          name: "Tomato Premium",
          sellingPrice: 299.99,
          sku: "TMTO-002",
        },
        quantity: 9,
      },
    ],
  },

  {
    id: 234436821,
    createdAt: "June 23, 2024, 12:00 PM",
    customer: {
      fullName: "Isabella Moore",
      phone: "+91 98765 43219",
    },
    totalAmount: 2750,
    paymentType: "CARD",
    status: "COMPLETED",
    items: [
      {
        id: 130,
        product: {
          image:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1200&auto=format&fit=crop",
          name: "Mushroom",
          sellingPrice: 349.99,
          sku: "MSRM-001",
        },
        quantity: 3,
      },
    ],
  },
  {
    id: 234436822,
    createdAt: "June 23, 2024, 02:45 PM",
    customer: {
      fullName: "William Jackson",
      phone: "+91 98765 43220",
    },
    totalAmount: 3899,
    paymentType: "CASH",
    status: "REFUNDED",
    items: [
      {
        id: 131,
        product: {
          image:
            "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop",
          name: "Cucumber",
          sellingPrice: 69.99,
          sku: "CUCB-001",
        },
        quantity: 5,
      },
    ],
  },

  {
    id: 234436823,
    createdAt: "June 24, 2024, 09:20 AM",
    customer: {
      fullName: "Mia White",
      phone: "+91 98765 43221",
    },
    totalAmount: 999,
    paymentType: "UPI",
    status: "COMPLETED",
    items: [
      {
        id: 132,
        product: {
          image:
            "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?q=80&w=1200&auto=format&fit=crop",
          name: "Lettuce",
          sellingPrice: 129.99,
          sku: "LTTC-001",
        },
        quantity: 2,
      },
    ],
  },

  {
    id: 234436824,
    createdAt: "June 24, 2024, 11:00 AM",
    customer: {
      fullName: "Benjamin Harris",
      phone: "+91 98765 43222",
    },
    totalAmount: 4899,
    paymentType: "CARD",
    status: "COMPLETED",
    items: [
      {
        id: 133,
        product: {
          image:
            "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=1200&auto=format&fit=crop",
          name: "Garlic",
          sellingPrice: 199.99,
          sku: "GRLC-001",
        },
        quantity: 6,
      },
    ],
  },

  {
    id: 234436825,
    createdAt: "June 24, 2024, 01:25 PM",
    customer: {
      fullName: "Charlotte Walker",
      phone: "+91 98765 43223",
    },
    totalAmount: 2599,
    paymentType: "CASH",
    status: "PENDING",
    items: [
      {
        id: 134,
        product: {
          image:
            "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?q=80&w=1200&auto=format&fit=crop",
          name: "Pumpkin",
          sellingPrice: 159.99,
          sku: "PMPK-001",
        },
        quantity: 4,
      },
    ],
  },

  {
    id: 234436826,
    createdAt: "June 24, 2024, 03:40 PM",
    customer: {
      fullName: "Ethan Hall",
      phone: "+91 98765 43224",
    },
    totalAmount: 6999,
    paymentType: "UPI",
    status: "COMPLETED",
    items: [
      {
        id: 135,
        product: {
          image:
            "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop",
          name: "Avocado",
          sellingPrice: 349.99,
          sku: "AVCD-001",
        },
        quantity: 8,
      },
    ],
  },

  {
    id: 234436827,
    createdAt: "June 25, 2024, 08:15 AM",
    customer: {
      fullName: "Amelia Scott",
      phone: "+91 98765 43225",
    },
    totalAmount: 1850,
    paymentType: "CARD",
    status: "COMPLETED",
    items: [
      {
        id: 136,
        product: {
          image:
            "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1200&auto=format&fit=crop",
          name: "Corn",
          sellingPrice: 89.99,
          sku: "CORN-001",
        },
        quantity: 7,
      },
    ],
  },

  {
    id: 234436828,
    createdAt: "June 25, 2024, 10:50 AM",
    customer: {
      fullName: "Lucas Young",
      phone: "+91 98765 43226",
    },
    totalAmount: 3200,
    paymentType: "CASH",
    status: "CANCELLED",
    items: [
      {
        id: 137,
        product: {
          image:
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
          name: "Cabbage",
          sellingPrice: 99.99,
          sku: "CBBG-001",
        },
        quantity: 9,
      },
    ],
  },

  {
    id: 234436829,
    createdAt: "June 25, 2024, 12:35 PM",
    customer: {
      fullName: "Harper King",
      phone: "+91 98765 43227",
    },
    totalAmount: 4100,
    paymentType: "UPI",
    status: "COMPLETED",
    items: [
      {
        id: 138,
        product: {
          image:
            "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1200&auto=format&fit=crop",
          name: "Beetroot",
          sellingPrice: 149.99,
          sku: "BTRT-001",
        },
        quantity: 5,
      },
    ],
  },

  {
    id: 234436830,
    createdAt: "June 25, 2024, 03:10 PM",
    customer: {
      fullName: "Henry Adams",
      phone: "+91 98765 43228",
    },
    totalAmount: 5400,
    paymentType: "CARD",
    status: "PENDING",
    items: [
      {
        id: 139,
        product: {
          image:
            "https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1200&auto=format&fit=crop",
          name: "Eggplant",
          sellingPrice: 179.99,
          sku: "EGPT-001",
        },
        quantity: 6,
      },
    ],
  },

  {
    id: 234436831,
    createdAt: "June 25, 2024, 05:20 PM",
    customer: {
      fullName: "Ella Green",
      phone: "+91 98765 43229",
    },
    totalAmount: 2899,
    paymentType: "CASH",
    status: "COMPLETED",
    items: [
      {
        id: 140,
        product: {
          image:
            "https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?q=80&w=1200&auto=format&fit=crop",
          name: "Sweet Potato",
          sellingPrice: 119.99,
          sku: "SWPT-001",
        },
        quantity: 11,
      },
    ],
  },
];

export default function OrderTable({ onViewOrderDetails }: OrderTableProps) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-4 py-1">
        <div>
          <h2 className="text-2xl font-bold">Order History</h2>

          <p className="text-sm text-muted-foreground">
            View and manage recent customer orders
          </p>
        </div>

        <Badge variant="secondary" className="px-3 py-1">
          {orders.length} Orders
        </Badge>
      </div>

      <div className="max-h-[calc(100vh-135px)] overflow-y-auto">
        <Table className="table-fixed">
          <TableHeader className="sticky top-0 z-20 bg-background">
            <TableRow>
              <TableHead className="w-30 px-4">Order ID</TableHead>

              <TableHead className="w-30 px-4">Date / Time</TableHead>

              <TableHead className="w-45 px-4">Customer</TableHead>

              <TableHead className="w-30 px-4">Amount</TableHead>

              <TableHead className="w-32.5 px-4">Payment Type</TableHead>

              <TableHead className="w-32.5 px-4">Status</TableHead>

              <TableHead className="w-25 px-4 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="h-12 hover:bg-muted/40">
                <TableCell className="px-4 font-medium">#{order.id}</TableCell>

                <TableCell className="px-2 text-muted-foreground">
                  {order.createdAt}
                </TableCell>

                <TableCell className="px-2">
                  <div>
                    <p className="font-medium leading-none">{order.customer.fullName}</p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.customer.phone}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="px-2 font-semibold">
                  ₹{order.totalAmount.toFixed(2)}
                </TableCell>

                <TableCell className="px-2">
                  <Badge variant="outline">{order.paymentType}</Badge>
                </TableCell>

                <TableCell className="px-2">
                  <Badge
                    variant={
                      order.status === "COMPLETED"
                        ? "default"
                        : order.status === "PENDING"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-2">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onViewOrderDetails(order)}
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <PrinterIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
