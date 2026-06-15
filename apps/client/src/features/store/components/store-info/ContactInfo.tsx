import { Label } from "@/components/ui/label";

import { Mail, MapPin, PhoneCall } from "lucide-react";

import type { Store } from "@/app/store/store/storeTypes";

type ContactInfoProps = {
  store: Store;
};

export default function ContactInfo({ store }: ContactInfoProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>

      <div className="space-y-5">
        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />

          <div>
            <Label className="text-sm text-muted-foreground">Store Address</Label>

            <p className="font-medium">{store.contact?.address || "Not Provided"}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <PhoneCall className="mt-1 h-4 w-4 text-muted-foreground" />

          <div>
            <Label className="text-sm text-muted-foreground">Phone Number</Label>

            <p className="font-medium">{store.contact?.phone || "Not Provided"}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="mt-1 h-4 w-4 text-muted-foreground" />

          <div>
            <Label className="text-sm text-muted-foreground">Email Address</Label>

            <p className="font-medium break-all">
              {store.contact?.email || "Not Provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
