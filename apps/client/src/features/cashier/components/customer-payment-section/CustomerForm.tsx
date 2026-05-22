import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, Formik } from "formik";
import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";

type FormikValues = {
  fullName: string;
  phone: string;
  email: string;
};

const initialValues: FormikValues = {
  fullName: "",
  phone: "",
  email: "",
};

type CustomerFormProps = {
  showCustomerForm: boolean;
  setShowCustomerForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomerForm({
  showCustomerForm,
  setShowCustomerForm,
}: CustomerFormProps) {
  return (
    <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
      <DialogContent className="min-w-md">
        <DialogHeader>
          <DialogTitle className="">Add New Customer</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log(`Form Submitted: ${values}`);
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form autoComplete="off" className="space-y-4 flex flex-col items-end">
              <div className="w-full space-y-1">
                <label className="text-sm font-medium">
                  Full Name <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    autoComplete="off"
                    className="pl-10"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Full Name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="w-full space-y-1">
                <label className="text-sm font-medium">
                  Phone Number <span className="text-red-600">*</span>
                </label>

                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    autoComplete="off"
                    className="pl-10"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="w-full space-y-1">
                <label className="text-sm font-medium">
                  Email <span className="text-muted-foreground">(Optional)</span>
                </label>

                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    autoComplete="off"
                    className="pl-10"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="cursor-pointer"
                disabled={!values.fullName || !values.phone}
              >
                Add Customer
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
