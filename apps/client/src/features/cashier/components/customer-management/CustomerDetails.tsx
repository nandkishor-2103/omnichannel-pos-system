import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PlusIcon, StarIcon } from "lucide-react";

export type Customer = {
  id: number;
  fullName: string;
  email?: string;
  phone?: string;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
};

type CustomerDetailsProps = {
  customer: Customer;
};

export default function CustomerDetails({ customer }: CustomerDetailsProps) {
  const averageOrderValue =
    customer.totalOrders > 0
      ? (customer.totalSpent / customer.totalOrders).toFixed(2)
      : "0";

  return (
    <div className="p-3">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-3 text-lg font-bold">Customer Details</h2>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="rounded-lg border bg-background px-4 py-2 shadow-sm transition hover:shadow-md">
              <span className="font-semibold">Name:</span>{" "}
              <span className="font-medium text-muted-foreground">
                {customer.fullName}
              </span>
            </div>

            <div className="rounded-lg border bg-background px-4 py-2 shadow-sm transition hover:shadow-md">
              <span className="font-semibold">Phone:</span>{" "}
              <span className="font-medium text-muted-foreground">{customer.phone}</span>
            </div>

            <div className="rounded-lg border bg-background px-4 py-2 shadow-sm transition hover:shadow-md">
              <span className="font-semibold">Email:</span>{" "}
              <span className="font-medium text-muted-foreground">
                {customer.email || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <Button className="cursor-pointer">
          <PlusIcon className="mr-1 h-4 w-4" />
          Add Point
        </Button>
      </div>

      <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Points</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <StarIcon className="mr-1 h-4 w-4 text-yellow-500" />
              <span>{customer.loyaltyPoints} point</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-2xl font-bold">{customer.totalOrders}</span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>

          <CardContent>
            <span className="text-2xl font-bold">₹ {customer.totalSpent.toFixed(2)}</span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Average Order Value</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-lg font-bold">₹ {averageOrderValue}</p>
        </CardContent>
      </Card>
    </div>
  );
}
