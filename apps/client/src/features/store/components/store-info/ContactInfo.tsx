import { Label } from "@/components/ui/label";
import { MailIcon, MapPin, PhoneCall } from "lucide-react";
import type { StoreData } from "./StoreInfo";

type BasicInfoProps = {
  storeData: StoreData[];
};
export default function ContactInfo({ storeData }: BasicInfoProps) {
  const store = storeData[0];
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="h-4 w-4 text-gray-400 mt-1" />

          <div>
            <Label className="text-sm text-muted-foreground">Store Address</Label>
            <p>{store.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <PhoneCall className="h-4 w-4 text-gray-400 mt-1" />

          <div>
            <Label className="text-sm text-muted-foreground">Phone</Label>
            <p>{store.phone}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MailIcon className="h-4 w-4 text-gray-400 mt-1" />

          <div>
            <Label className="text-sm text-muted-foreground">Email</Label>
            <p>{store.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
