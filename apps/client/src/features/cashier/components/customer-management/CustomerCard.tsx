import { Badge } from "@/components/ui/badge";
import { MailIcon, PhoneIcon, StarIcon, UserIcon } from "lucide-react";

export type Customer = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
};

type CustomerCardProps = {
  customer: Customer;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
};

export default function CustomerCard({
  customer,
  setSelectedCustomer,
}: CustomerCardProps) {
  return (
    <div
      onClick={() => setSelectedCustomer(customer)}
      className="cursor-pointer border-b p-4 transition hover:bg-accent/50"
    >
      <div className="flex items-start justify-between">
        {/* Left */}
        <div className="space-y-2">
          {/* Name */}
          <div className="flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-primary" />

            <h3 className="font-semibold text-primary">{customer.fullName}</h3>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <MailIcon className="h-4 w-4" />

            <span className="text-muted-foreground">{customer.email || "N/A"}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm">
            <PhoneIcon className="h-4 w-4" />

            <span className="text-muted-foreground">{customer.phone}</span>
          </div>
        </div>

        {/* Right */}
        <Badge className="gap-1">
          <StarIcon className="h-4 w-4" />
          {customer.loyaltyPoints} point
        </Badge>
      </div>
    </div>
  );
}
