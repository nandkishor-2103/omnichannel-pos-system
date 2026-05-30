import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";

type BranchInfoType = {
  name: string;
  phone: string;
  address: string;
  manager: string;
};

type BranchFormProps = {
  onSubmit: (values: BranchInfoType) => void;
  onCancel: () => void;
  initialValues?: BranchInfoType;
  isEditing?: boolean;
};

type FormFieldProps = {
  placeholder: string;
  label: string;
  type: string;
  name: keyof BranchInfoType;
  //   value: string;
  //   onChange: (field: keyof BranchInfoType, value: string) => void;
};

const loading = false;

function FormField({ placeholder, label, type, name }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      <Input
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        name={name}
        // value={value}
        // onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

export default function BranchForm({
  onSubmit,
  onCancel,
  initialValues,
  isEditing = false,
}: BranchFormProps) {
  return (
    <Formik<BranchInfoType>
      initialValues={
        initialValues || {
          name: "",
          address: "",
          manager: "",
          phone: "",
        }
      }
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="space-y-4">
            <FormField
              placeholder="Enter branch name"
              label="Branch Name:"
              type="text"
              name="name"
            />

            <FormField
              placeholder="Enter branch address"
              label="Branch Address:"
              type="text"
              name="address"
            />

            <FormField
              placeholder="Enter manager name"
              label="Manager Name:"
              type="text"
              name="manager"
            />

            <FormField
              placeholder="Enter branch phone number"
              label="Contact Number:"
              type="tel"
              name="phone"
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="cursor-pointer"
              >
                {isSubmitting || loading
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                    ? "Update Branch"
                    : "Add Branch"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
