import { useState } from "react";

import { Formik, Form, Field } from "formik";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type BranchInfoType = {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingDays: string[];
  openTime: string;
  closeTime: string;
};

type BranchFormProps = {
  onSubmit: (values: BranchInfoType) => void;
  onCancel: () => void;
  initialValues?: BranchInfoType;
  isEditing?: boolean;
};

const workingDaysOptions = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const timeOptions = [
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
];

const loading = false;

export default function BranchForm({
  onSubmit,
  onCancel,
  initialValues,
  isEditing = false,
}: BranchFormProps) {
  const [openOpenTime, setOpenOpenTime] = useState(false);

  const [openCloseTime, setOpenCloseTime] = useState(false);

  return (
    <Formik<BranchInfoType>
      enableReinitialize
      initialValues={
        initialValues ?? {
          name: "",
          address: "",
          phone: "",
          email: "",
          workingDays: [],
          openTime: "09:00 AM",
          closeTime: "06:00 PM",
        }
      }
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="space-y-5">
            {/* Branch Name */}
            <div className="space-y-2">
              <Label>Branch Name</Label>

              <Field as={Input} name="name" placeholder="Enter branch name" />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label>Address</Label>

              <Field as={Input} name="address" placeholder="Enter branch address" />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label>Phone Number</Label>

              <Field as={Input} name="phone" placeholder="Enter phone number" />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email Address</Label>

              <Field
                as={Input}
                type="email"
                name="email"
                placeholder="Enter branch email"
              />
            </div>

            {/* Working Days */}
            <div className="space-y-3">
              <Label>Working Days</Label>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {workingDaysOptions.map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox
                      checked={values.workingDays.includes(day)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFieldValue("workingDays", [...values.workingDays, day]);
                        } else {
                          setFieldValue(
                            "workingDays",
                            values.workingDays.filter((item) => item !== day)
                          );
                        }
                      }}
                    />

                    <Label className="cursor-pointer text-sm">{day}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Opening Time */}
              <div className="space-y-2">
                <Label>Opening Time</Label>

                <Popover open={openOpenTime} onOpenChange={setOpenOpenTime}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {values.openTime || "Select opening time"}

                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search opening time..." />

                      <CommandEmpty>No time found.</CommandEmpty>

                      <CommandGroup className="max-h-64 overflow-y-auto">
                        {timeOptions.map((time) => (
                          <CommandItem
                            key={time}
                            value={time}
                            onSelect={() => {
                              setFieldValue("openTime", time);
                              setOpenOpenTime(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                values.openTime === time ? "opacity-100" : "opacity-0"
                              }`}
                            />

                            {time}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Closing Time */}
              <div className="space-y-2">
                <Label>Closing Time</Label>

                <Popover open={openCloseTime} onOpenChange={setOpenCloseTime}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {values.closeTime || "Select closing time"}

                      <ChevronsUpDown className="h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput placeholder="Search closing time..." />

                      <CommandEmpty>No time found.</CommandEmpty>

                      <CommandGroup className="max-h-64 overflow-y-auto">
                        {timeOptions.map((time) => (
                          <CommandItem
                            key={time}
                            value={time}
                            onSelect={() => {
                              setFieldValue("closeTime", time);
                              setOpenCloseTime(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                values.closeTime === time ? "opacity-100" : "opacity-0"
                              }`}
                            />

                            {time}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>

              <Button type="submit" disabled={loading || isSubmitting}>
                {loading || isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                    ? "Update Branch"
                    : "Create Branch"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
