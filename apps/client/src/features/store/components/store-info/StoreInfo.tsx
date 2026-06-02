import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { EditIcon } from "lucide-react";

import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import EditStoreForm from "./EditStoreForm";

import { getInitialValues, type StoreFormValues } from "./formUtils";

export type StoreData = {
  brand: string;
  storeType: string;
  description: string;
  address: string;
  phone: string;
  email: string;
};

const storeData: StoreData[] = [
  {
    brand: "Infotact",
    storeType: "Retail Store",
    description: "Infotact is a leading provider of IT solutions.",
    address: "123 Main St, Anytown, USA",
    phone: "123-456-7890",
    email: "contact@infotact.com",
  },
];

export default function StoreInfo() {
  const [isOpenEditStoreDialog, setIsOpenEditStoreDialog] = useState(false);

  const onSubmit = (values: StoreFormValues) => {
    console.log(values);

    setIsOpenEditStoreDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold">Store Information</CardTitle>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpenEditStoreDialog(true)}
              className="cursor-pointer"
            >
              <EditIcon className="h-4 w-4" />
              Edit Details
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <BasicInfo storeData={storeData} />
            <ContactInfo storeData={storeData} />
          </div>

          <div className="mt-4 pt-3 border-t">
            <p className="text-sm text-muted-foreground">
              Store Created On: {new Date().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpenEditStoreDialog} onOpenChange={setIsOpenEditStoreDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-center">Edit Store Details</DialogTitle>
          </DialogHeader>

          <EditStoreForm
            initialValues={getInitialValues(storeData[0])}
            onSubmit={onSubmit}
            onCancel={() => setIsOpenEditStoreDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
