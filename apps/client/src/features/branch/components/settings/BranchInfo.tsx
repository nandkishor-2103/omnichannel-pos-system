import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Save } from "lucide-react";

import { useFormik } from "formik";

import { updateBranch } from "@/app/store/branch/branchThunk";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

type BranchInfoType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  workingDays: string[];
};

type FormFieldProps = {
  placeholder: string;
  label: string;
  type: string;
  name: keyof BranchInfoType;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function FormField({ placeholder, label, type, name, value, onChange }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <Input
        placeholder={placeholder}
        type={type}
        autoComplete="off"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

const workingDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function BranchInfo() {
  const dispatch = useAppDispatch();

  const branch = useAppSelector((state) => state.branch.branch);

  const formik = useFormik<BranchInfoType>({
    enableReinitialize: true,

    initialValues: {
      name: branch?.name ?? "",
      email: branch?.email ?? "",
      phone: branch?.phone ?? "",
      address: branch?.address ?? "",
      workingDays: branch?.workingDays ?? [],
    },

    onSubmit: async (values) => {
      if (!branch?._id) return;

      await dispatch(
        updateBranch({
          id: branch._id,
          dto: {
            name: values.name,
            email: values.email,
            phone: values.phone,
            address: values.address,
            workingDays: values.workingDays,
          },
        })
      ).unwrap();
    },
  });

  const handleWorkingDayChange = (day: string) => {
    const updatedDays = formik.values.workingDays.includes(day)
      ? formik.values.workingDays.filter((item) => item !== day)
      : [...formik.values.workingDays, day];

    formik.setFieldValue("workingDays", updatedDays);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branch Information</CardTitle>

        <CardDescription>Update your branch details and business time</CardDescription>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                placeholder="Enter branch name"
                label="Branch Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              <FormField
                placeholder="Enter branch address"
                label="Address"
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />

              <FormField
                placeholder="Enter branch contact number"
                label="Contact Number"
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />

              <FormField
                placeholder="Enter branch email address"
                label="Email"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>

            <Separator />

            <div className="mt-4">
              <label className="text-sm font-medium">Working Days</label>

              <div className="grid grid-cols-2 gap-2 mt-2 md:grid-cols-4">
                {workingDays.map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox
                      className="cursor-pointer"
                      checked={formik.values.workingDays.includes(day)}
                      onCheckedChange={() => handleWorkingDayChange(day)}
                    />

                    <label className="text-sm text-gray-700">{day}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" className="cursor-pointer">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
