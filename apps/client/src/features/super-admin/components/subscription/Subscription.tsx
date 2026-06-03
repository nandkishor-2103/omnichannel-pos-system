import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EditIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import AddPlanDialog from "./AddPlanDialog";
import EditPlanDialog from "./EditPlanDialog";

type SubscriptionPlan = {
  id: number;
  name: string;
  price: string;
  billingCycle: string;
  branches: string;
  users: string;
  products: string;
  status: "Active" | "Inactive";
};

const plans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "Starter",
    price: "₹499",
    billingCycle: "Monthly",
    branches: "1",
    users: "5",
    products: "1,000",
    status: "Active",
  },
  {
    id: 2,
    name: "Growth",
    price: "₹1,499",
    billingCycle: "Monthly",
    branches: "10",
    users: "50",
    products: "10,000",
    status: "Active",
  },
  {
    id: 3,
    name: "Professional",
    price: "₹2,999",
    billingCycle: "Monthly",
    branches: "50",
    users: "200",
    products: "50,000",
    status: "Active",
  },
  {
    id: 4,
    name: "Enterprise",
    price: "₹7,999",
    billingCycle: "Monthly",
    branches: "Unlimited",
    users: "Unlimited",
    products: "Unlimited",
    status: "Active",
  },
  {
    id: 5,
    name: "Starter Annual",
    price: "₹4,999",
    billingCycle: "Yearly",
    branches: "1",
    users: "5",
    products: "1,000",
    status: "Active",
  },
  {
    id: 6,
    name: "Growth Annual",
    price: "₹14,999",
    billingCycle: "Yearly",
    branches: "10",
    users: "50",
    products: "10,000",
    status: "Active",
  },
  {
    id: 7,
    name: "Professional Annual",
    price: "₹29,999",
    billingCycle: "Yearly",
    branches: "50",
    users: "200",
    products: "50,000",
    status: "Active",
  },
  {
    id: 8,
    name: "Enterprise Annual",
    price: "₹79,999",
    billingCycle: "Yearly",
    branches: "Unlimited",
    users: "Unlimited",
    products: "Unlimited",
    status: "Active",
  },
  {
    id: 9,
    name: "Retail Basic",
    price: "₹699",
    billingCycle: "Monthly",
    branches: "2",
    users: "10",
    products: "2,500",
    status: "Active",
  },
  {
    id: 10,
    name: "Retail Plus",
    price: "₹1,999",
    billingCycle: "Monthly",
    branches: "15",
    users: "75",
    products: "15,000",
    status: "Active",
  },
  {
    id: 11,
    name: "Restaurant POS",
    price: "₹999",
    billingCycle: "Monthly",
    branches: "3",
    users: "20",
    products: "5,000",
    status: "Active",
  },
  {
    id: 12,
    name: "Restaurant Pro",
    price: "₹2,499",
    billingCycle: "Monthly",
    branches: "20",
    users: "100",
    products: "15,000",
    status: "Inactive",
  },
  {
    id: 13,
    name: "Pharmacy Basic",
    price: "₹899",
    billingCycle: "Monthly",
    branches: "2",
    users: "15",
    products: "8,000",
    status: "Active",
  },
  {
    id: 14,
    name: "Pharmacy Pro",
    price: "₹2,299",
    billingCycle: "Monthly",
    branches: "10",
    users: "60",
    products: "30,000",
    status: "Active",
  },
  {
    id: 15,
    name: "Wholesale Business",
    price: "₹3,499",
    billingCycle: "Monthly",
    branches: "25",
    users: "150",
    products: "75,000",
    status: "Active",
  },
  {
    id: 16,
    name: "Custom Enterprise",
    price: "Custom",
    billingCycle: "Custom",
    branches: "Unlimited",
    users: "Unlimited",
    products: "Unlimited",
    status: "Inactive",
  },
];

export default function Subscription() {
  const handleEdit = () => {
    setOpenEditPlan(true);
    console.log("Edit Plan");
  };

  const handleDelete = () => {
    console.log("Delete Plan");
  };

  const [openAddNewPlan, setOpenAddNewPlan] = useState(false);
  const [openEditPlan, setOpenEditPlan] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscription Plans</h1>

          <p className="text-sm text-muted-foreground">
            Manage pricing plans available for stores
          </p>
        </div>

        <Button onClick={() => setOpenAddNewPlan(true)} className="cursor-pointer">
          <PlusIcon className="h-4 w-4" />
          Add New Plan
        </Button>
      </div>

      {/* Table */}
      <div className="max-h-[67vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Billing</TableHead>
              <TableHead>Branches</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id} className="hover:bg-muted/40 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-xs text-muted-foreground">Plan ID #{plan.id}</p>
                  </div>
                </TableCell>

                <TableCell className="font-medium">{plan.price}</TableCell>

                <TableCell>{plan.billingCycle}</TableCell>

                <TableCell>{plan.branches}</TableCell>

                <TableCell>{plan.users}</TableCell>

                <TableCell>{plan.products}</TableCell>

                <TableCell>
                  <Badge variant={plan.status === "Active" ? "default" : "secondary"}>
                    {plan.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      title="Edit Plan"
                      onClick={handleEdit}
                      className="h-8 w-8 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 shadow-none cursor-pointer"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      title="Delete Plan"
                      onClick={handleDelete}
                      className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200 shadow-none cursor-pointer"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add New Plan Dialog */}
      <AddPlanDialog open={openAddNewPlan} onOpenChange={setOpenAddNewPlan} />

      {/* Edit Plan Dialog */}
      <EditPlanDialog open={openEditPlan} onOpenChange={setOpenEditPlan} />
    </div>
  );
}
