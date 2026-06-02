import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, Form, Formik, type FieldProps } from "formik";

import type { StoreFormValues } from "./formUtils";

const storeTypeList = [
  {
    value: "Retail Store",
    label: "Retail Store",
  },
  {
    value: "Supermarket",
    label: "Supermarket",
  },
  {
    value: "Mall",
    label: "Mall",
  },
  {
    value: "Department Store",
    label: "Department Store",
  },
  {
    value: "Convenience Store",
    label: "Convenience Store",
  },
  {
    value: "Specialty Store",
    label: "Specialty Store",
  },
];

type EditStoreFormProps = {
  initialValues: StoreFormValues;
  onSubmit: (values: StoreFormValues) => void;
  onCancel?: () => void;
};

export default function EditStoreForm({
  initialValues,
  onSubmit,
  onCancel,
}: EditStoreFormProps) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Store Name <span className="text-red-500">*</span>
            </label>

            <Field as={Input} name="brand" placeholder="Enter store name" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Store Type <span className="text-red-500">*</span>
            </label>

            <Field name="storeType">
              {({ field }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => setFieldValue("storeType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Store Type" />
                  </SelectTrigger>

                  <SelectContent>
                    {storeTypeList.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Field
              as={Textarea}
              name="description"
              rows={4}
              placeholder="Enter description"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Address <span className="text-red-500">*</span>
                </label>

                <Field
                  as={Textarea}
                  name="address"
                  rows={3}
                  placeholder="Enter address"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Contact Number <span className="text-red-500">*</span>
                </label>

                <Field as={Input} name="phone" placeholder="Enter contact number" />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>

                <Field as={Input} name="email" type="email" placeholder="Enter email" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 cursor-pointer"
            >
              Update Store
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
