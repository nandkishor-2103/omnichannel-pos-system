import { useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { getAllSubscriptionPlans } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus } from "lucide-react";

import LoadingSpinner from "@/components/shared/LoadingSpinner";

import SubscriptionTable from "./components/SubscriptionTable";
import AddPlanDialog from "./components/AddPlanDialog";

export default function SubscriptionPage() {
  const dispatch = useAppDispatch();

  const { plans, loading } = useAppSelector((state) => state.subscriptionPlan);

  const [searchTerm, setSearchTerm] = useState("");

  const [openAddPlan, setOpenAddPlan] = useState(false);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  const totalPlans = useMemo(() => plans.length, [plans]);

  const activePlans = useMemo(
    () => plans.filter((plan) => plan.status === "ACTIVE").length,
    [plans]
  );

  const inactivePlans = useMemo(
    () => plans.filter((plan) => plan.status === "INACTIVE").length,
    [plans]
  );

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <LoadingSpinner size={24} text="Loading subscription plans..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>

          <p className="text-muted-foreground">
            Manage pricing plans available for stores.
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />

          <Button onClick={() => setOpenAddPlan(true)} className="cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Total Plans</p>

          <h2 className="mt-2 text-3xl font-bold">{totalPlans}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Active Plans</p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">{activePlans}</h2>
        </div>

        <div className="rounded-lg border p-5">
          <p className="text-sm text-muted-foreground">Inactive Plans</p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">{inactivePlans}</h2>
        </div>
      </div>

      {/* Table */}

      <div className="max-h-[70vh] overflow-y-auto rounded-lg border">
        <SubscriptionTable plans={plans} searchTerm={searchTerm} />
      </div>

      <AddPlanDialog open={openAddPlan} onOpenChange={setOpenAddPlan} />
    </div>
  );
}
