import { Field, Form, Formik } from "formik";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type CategoryFormValues = {
  name: string;
  description: string;
};

type CategoryFormProps = {
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
  initialValues?: CategoryFormValues;
  isEditing?: boolean;
};

export default function CategoryForm({
  onSubmit,
  onCancel,
  initialValues,
  isEditing = false,
}: CategoryFormProps) {
  return (
    <Formik<CategoryFormValues>
      enableReinitialize
      initialValues={
        initialValues ?? {
          name: "",
          description: "",
        }
      }
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          {/* Category Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>

            <Field as={Input} id="name" name="name" placeholder="Enter category name" />
          </div>

          {/* Description */}
          {/* <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Field
              as={Textarea}
              id="description"
              name="description"
              rows={4}
              placeholder="Enter category description"
            />
          </div> */}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="cursor-pointer"
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                  ? "Update Category"
                  : "Create Category"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
