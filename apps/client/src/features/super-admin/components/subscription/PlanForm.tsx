import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, Form, type FieldProps } from "formik";
import FeaturesSwitchGrid from "./FeaturesSwitchGrid";
import ExtraFeaturesList from "./ExtraFeaturesList";
import { Button } from "@/components/ui/button";
import type { PlanFormValues } from "../../types/types";

const BILLING_CYCLE = [
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "Yearly",
    value: "YEARLY",
  },
];

export default function PlanForm({
  values,
  isSubmitting,
  setFieldValue,
}: {
  values: PlanFormValues;
  isSubmitting: boolean;
  setFieldValue: (field: string, value: unknown) => void;
}) {
  const handleFeatureSwitch = (key: string, value: boolean) => {
    setFieldValue(key, value);
  };

  const handleExtraFeatureChange = (idx: number, value: string) => {
    const arr = [...values.extraFeatures];
    arr[idx] = value;

    setFieldValue("extraFeatures", arr);
  };

  const handleRemoveExtraFeatureChange = (idx: number) => {
    const arr = values.extraFeatures.filter((_, i) => i !== idx);
    setFieldValue("extraFeatures", arr.length ? arr : [""]);
  };

  const handleAddExtraFeatureChange = () => {
    setFieldValue("extraFeatures", [...values.extraFeatures, ""]);
  };

  return (
    <Form className="space-y-4">
      {/* Plan Name */}
      <div>
        <label htmlFor="plan-name" className="block font-medium">
          Plan Name
        </label>
        <Field
          as={Input}
          id="plan-name"
          name="name"
          placeholder="Enter plan name"
          type="text"
        />
      </div>

      {/* Plan Description */}
      <div>
        <label htmlFor="plan-description" className="block font-medium">
          Plan Description
        </label>
        <Field
          as={Textarea}
          id="plan-description"
          name="description"
          placeholder="Enter plan description"
          rows={4}
          type="text"
        />
      </div>

      {/* Price and Billing Cycle */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="plan-price" className="block font-medium">
            Price (₹)
          </label>
          <Field
            as={Input}
            id="plan-price"
            name="price"
            placeholder="Enter price billing cycle"
            type="number"
            min={0}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="plan-billing-cycle" className="block font-medium">
            Billing Cycle
          </label>
          <Field name="billingCycle">
            {({ field }: FieldProps) => (
              <Select
                value={field.value}
                onValueChange={(val) => setFieldValue("billingCycle", val)}
              >
                <SelectTrigger className="w-full" id="plan-billing-cycle">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  {BILLING_CYCLE.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>
        </div>
      </div>

      {/* Branches, Users, Products */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="plan-branches" className="block font-medium">
            Branches
          </label>
          <Field
            as={Input}
            id="plan-branches"
            name="maxBranches"
            placeholder="Enter branches"
            type="number"
            min={1}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="plan-users" className="block font-medium">
            Users
          </label>
          <Field
            as={Input}
            id="plan-users"
            name="maxUsers"
            placeholder="Enter users"
            type="number"
            min={1}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="plan-products" className="block font-medium">
            Products
          </label>
          <Field
            as={Input}
            id="plan-products"
            name="maxProducts"
            placeholder="Enter products"
            type="number"
            min={1}
          />
        </div>
      </div>

      {/* Features Switches */}
      <div>
        <label className="block font-medium mb-2">Features</label>
        <FeaturesSwitchGrid handleFeatureSwitch={handleFeatureSwitch} />
      </div>

      {/* Extra Features */}
      <div>
        <label className="block font-medium mb-2">Extra Features</label>
        <ExtraFeaturesList
          values={values}
          handleExtraFeatureChange={handleExtraFeatureChange}
          handleRemoveExtraFeatureChange={handleRemoveExtraFeatureChange}
          handleAddExtraFeatureChange={handleAddExtraFeatureChange}
        />
      </div>

      <div>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
