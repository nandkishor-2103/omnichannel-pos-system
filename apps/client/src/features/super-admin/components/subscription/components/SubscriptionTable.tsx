import { useMemo, useState } from "react";

import type { SubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanTypes";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUpDown, Edit, Power, Trash2 } from "lucide-react";

import SubscriptionStatusBadge from "./SubscriptionStatusBadge";

import EditPlanDialog from "./EditPlanDialog";
import DeletePlanDialog from "./DeletePlanDialog";
import ActivatePlanDialog from "./ActivatePlanDialog";
import DeactivatePlanDialog from "./DeactivatePlanDialog";

type Props = {
  plans: SubscriptionPlan[];
  searchTerm: string;
};

export default function SubscriptionTable({ plans, searchTerm }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [openActivate, setOpenActivate] = useState(false);

  const [openDeactivate, setOpenDeactivate] = useState(false);

  const filteredPlans = useMemo(() => {
    return [...plans]
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? "").getTime() - new Date(a.createdAt ?? "").getTime()
      )
      .filter((plan) => {
        const query = searchTerm.toLowerCase();

        return (
          plan.name.toLowerCase().includes(query) ||
          plan.billingCycle.toLowerCase().includes(query)
        );
      });
  }, [plans, searchTerm]);

  const getRowClassName = (status: SubscriptionPlan["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-50/30";

      case "INACTIVE":
        return "bg-red-50/30";

      default:
        return "";
    }
  };

  if (filteredPlans.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-sm text-muted-foreground">No subscription plans found.</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-2">
                Plan
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>

            <TableHead>Price</TableHead>

            <TableHead>Billing</TableHead>

            <TableHead>Branches</TableHead>

            <TableHead>Users</TableHead>

            <TableHead>Products</TableHead>

            <TableHead>Status</TableHead>

            <TableHead>Created</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredPlans.map((plan) => (
            <TableRow key={plan._id} className={getRowClassName(plan.status)}>
              <TableCell>
                <div>
                  <p className="font-medium">{plan.name}</p>

                  <p className="text-xs text-muted-foreground">
                    {plan.description || "No description"}
                  </p>
                </div>
              </TableCell>

              <TableCell>₹{plan.price.toLocaleString("en-IN")}</TableCell>

              <TableCell>{plan.billingCycle}</TableCell>

              <TableCell>{plan.maxBranches}</TableCell>

              <TableCell>{plan.maxUsers}</TableCell>

              <TableCell>{plan.maxProducts.toLocaleString("en-IN")}</TableCell>

              <TableCell>
                <SubscriptionStatusBadge status={plan.status} />
              </TableCell>

              <TableCell>
                {plan.createdAt
                  ? new Date(plan.createdAt).toLocaleDateString("en-IN")
                  : "-"}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpenEdit(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {plan.status === "ACTIVE" ? (
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer border-orange-200 text-orange-600"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setOpenDeactivate(true);
                      }}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer border-green-200 text-green-600"
                      onClick={() => {
                        setSelectedPlan(plan);
                        setOpenActivate(true);
                      }}
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer border-red-200 text-red-600"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setOpenDelete(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedPlan && (
        <>
          <EditPlanDialog
            open={openEdit}
            onOpenChange={setOpenEdit}
            plan={selectedPlan}
          />

          <DeletePlanDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            plan={selectedPlan}
          />

          <ActivatePlanDialog
            open={openActivate}
            onOpenChange={setOpenActivate}
            plan={selectedPlan}
          />

          <DeactivatePlanDialog
            open={openDeactivate}
            onOpenChange={setOpenDeactivate}
            plan={selectedPlan}
          />
        </>
      )}
    </>
  );
}
