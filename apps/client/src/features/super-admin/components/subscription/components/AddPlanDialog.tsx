import { Formik } from "formik";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { createSubscriptionPlan } from "@/app/store/subscriptionPlan/subscriptionPlanThunk";

import type { PlanFormValues } from "../../../types/types";

import PlanForm from "./PlanForm";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

export default function AddPlanDialog({ open, onOpenChange, onSuccess }: Props) {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.subscriptionPlan);

  const initialValues: PlanFormValues = {
    name: "",

    description: "",

    price: "",

    billingCycle: "MONTHLY",

    maxBranches: "",

    maxUsers: "",

    maxProducts: "",

    enableAdvancedReports: false,

    enableInventory: false,

    enableIntegrations: false,

    enableEcommerce: false,

    enableInvoiceBranding: false,

    prioritySupport: false,

    enableMultiLocation: false,

    extraFeatures: [""],
  };

  const handleSubmit = async (values: PlanFormValues) => {
    try {
      await dispatch(
        createSubscriptionPlan({
          name: values.name,

          description: values.description,

          price: Number(values.price),

          billingCycle: values.billingCycle,

          maxBranches: Number(values.maxBranches),

          maxUsers: Number(values.maxUsers),

          maxProducts: Number(values.maxProducts),

          enableAdvancedReports: values.enableAdvancedReports,

          enableInventory: values.enableInventory,

          enableIntegrations: values.enableIntegrations,

          enableEcommerce: values.enableEcommerce,

          enableInvoiceBranding: values.enableInvoiceBranding,

          prioritySupport: values.prioritySupport,

          enableMultiLocation: values.enableMultiLocation,

          extraFeatures: values.extraFeatures.filter((feature) => feature.trim() !== ""),
        })
      ).unwrap();

      onSuccess?.();

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">Add Subscription Plan</DialogTitle>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto pr-2">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {(props) => (
              <PlanForm
                values={props.values}
                isSubmitting={loading}
                setFieldValue={props.setFieldValue}
              />
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
}
