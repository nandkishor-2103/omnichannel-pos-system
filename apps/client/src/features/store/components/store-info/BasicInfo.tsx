import { Label } from "@/components/ui/label";
import type { StoreData } from "./StoreInfo";
import { Badge } from "@/components/ui/badge";

type BasicInfoProps = {
  storeData: StoreData[];
};

export default function BasicInfo({ storeData }: BasicInfoProps) {
  const store = storeData[0];
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-muted-foreground">Store Name:</Label>
          <p className="font-medium">{store.brand}</p>
        </div>
        <div>
          <Label className="text-sm text-muted-foreground">Store Type:</Label>
          <Badge className="mt-1" variant={"secondary"}>
            {store.storeType}
          </Badge>
        </div>

        <div>
          <Label className="text-sm text-muted-foreground">Description:</Label>
          <p className="font-medium">{store.description}</p>
        </div>
      </div>
    </div>
  );
}
