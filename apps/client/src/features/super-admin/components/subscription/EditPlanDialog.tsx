import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Formik } from "formik";

import PlanForm from "./PlanForm";

import type { DialogProps, PlanFormValues } from "../../types/types";

export default function EditPlanDialog({ open, onOpenChange, onSuccess }: DialogProps) {
  const initialValues: PlanFormValues = {
    name: "Plan 2",
    description: "Plan 2 description",
    price: 3455,
    billingCycle: "MONTHLY",
    maxBranches: 10,
    maxUsers: 100,
    maxProducts: 100,

    enableAdvancedReports: false,
    enableInventory: false,
    enableIntegrations: false,
    enableEcommerce: false,
    enableInvoiceBranding: false,
    prioritySupport: false,
    enableMultiLocation: false,

    extraFeatures: ["Inventory", "Integrations"],
  };

  const handleSubmit = (values: PlanFormValues) => {
    console.log("Edit Plan", values);

    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Edit Subscription Plan</DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props) => <PlanForm {...props} />}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
