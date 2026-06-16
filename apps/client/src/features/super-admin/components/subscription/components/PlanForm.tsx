import { Form, Field, type FieldProps } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import FeaturesSwitchGrid from "./form/FeaturesSwitchGrid";
import ExtraFeaturesList from "./form/ExtraFeaturesList";

import type { PlanFormValues } from "../../../types/types";

const BILLING_CYCLES = [
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "Yearly",
    value: "YEARLY",
  },
];

type Props = {
  values: PlanFormValues;
  isSubmitting: boolean;
  setFieldValue: (field: string, value: unknown) => void;
};

export default function PlanForm({ values, isSubmitting, setFieldValue }: Props) {
  return (
    <Form className="space-y-6">
      {/* Basic Info */}

      <div className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">Plan Name</label>

          <Field as={Input} name="name" placeholder="Enter plan name" />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>

          <Field
            as={Textarea}
            name="description"
            rows={4}
            placeholder="Enter plan description"
          />
        </div>
      </div>

      {/* Pricing */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">Price (₹)</label>

          <Field as={Input} name="price" type="number" min={0} />
        </div>

        <div>
          <label className="mb-2 block font-medium">Billing Cycle</label>

          <Field name="billingCycle">
            {({ field }: FieldProps) => (
              <Select
                value={field.value}
                onValueChange={(value) => setFieldValue("billingCycle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Billing Cycle" />
                </SelectTrigger>

                <SelectContent>
                  {BILLING_CYCLES.map((cycle) => (
                    <SelectItem key={cycle.value} value={cycle.value}>
                      {cycle.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Field>
        </div>
      </div>

      {/* Limits */}

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-medium">Max Branches</label>

          <Field as={Input} name="maxBranches" type="number" min={1} />
        </div>

        <div>
          <label className="mb-2 block font-medium">Max Users</label>

          <Field as={Input} name="maxUsers" type="number" min={1} />
        </div>

        <div>
          <label className="mb-2 block font-medium">Max Products</label>

          <Field as={Input} name="maxProducts" type="number" min={1} />
        </div>
      </div>

      {/* Features */}

      <FeaturesSwitchGrid values={values} setFieldValue={setFieldValue} />

      {/* Extra Features */}

      <ExtraFeaturesList values={values} setFieldValue={setFieldValue} />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Plan"}
      </Button>
    </Form>
  );
}
