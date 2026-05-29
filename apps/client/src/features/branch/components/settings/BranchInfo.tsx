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

import { useState } from "react";

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
  onChange: (field: keyof BranchInfoType, value: string) => void;
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
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

const workingDays: string[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function BranchInfo() {
  const [branchInfo, setBranchInfo] = useState<BranchInfoType>({
    name: "",
    email: "",
    phone: "",
    address: "",
    workingDays: [],
  });

  const handleBranchInfoChange = (
    field: keyof BranchInfoType,
    value: string | string[]
  ): void => {
    setBranchInfo({
      ...branchInfo,
      [field]: value,
    });
  };

  const handleWorkingDayChange = (day: string) => {
    const updatedDays = branchInfo.workingDays.includes(day)
      ? branchInfo.workingDays.filter((item) => item !== day)
      : [...branchInfo.workingDays, day];

    handleBranchInfoChange("workingDays", updatedDays);
  };

  const handleSaveSettings = () => {
    console.log("Branch Info: ", branchInfo);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branch Information</CardTitle>

        <CardDescription>Update your branch Details and business time</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              placeholder="Enter branch name"
              label="Branch Name:"
              type="text"
              name="name"
              value={branchInfo.name}
              onChange={handleBranchInfoChange}
            />

            <FormField
              placeholder="Enter branch address"
              label="Address:"
              type="text"
              name="address"
              value={branchInfo.address}
              onChange={handleBranchInfoChange}
            />

            <FormField
              placeholder="Enter branch contact number"
              label="Contact Number:"
              type="tel"
              name="phone"
              value={branchInfo.phone}
              onChange={handleBranchInfoChange}
            />

            <FormField
              placeholder="Enter branch email address"
              label="Email:"
              type="email"
              name="email"
              value={branchInfo.email}
              onChange={handleBranchInfoChange}
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
                    checked={branchInfo.workingDays.includes(day)}
                    onCheckedChange={() => handleWorkingDayChange(day)}
                  />

                  <label className="text-sm text-gray-700">{day}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Button className="cursor-pointer" onClick={handleSaveSettings}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
