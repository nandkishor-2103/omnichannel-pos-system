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
    value: "Super Market",
    label: "Super Market",
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
        <Form className="space-y-5">
          {/* Store Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Store Name <span className="text-red-500">*</span>
            </label>

            <Field as={Input} name="brand" placeholder="Enter store name" />
          </div>

          {/* Store Type */}
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

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <Field
              as={Textarea}
              name="description"
              rows={4}
              placeholder="Enter description"
            />
          </div>

          {/* Contact Section */}
          <div className="border-t pt-5">
            <h3 className="mb-4 font-semibold">Contact Information</h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Address <span className="text-red-500">*</span>
                </label>

                <Field
                  as={Textarea}
                  name="contact.address"
                  rows={3}
                  placeholder="Enter store address"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Contact Number <span className="text-red-500">*</span>
                </label>

                <Field
                  as={Input}
                  name="contact.phone"
                  placeholder="Enter contact number"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>

                <Field
                  as={Input}
                  name="contact.email"
                  type="email"
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 border-t pt-4">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Update Store
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
