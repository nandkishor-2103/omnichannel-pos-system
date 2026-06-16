import { Badge } from "@/components/ui/badge";

type Props = {
  status: "ACTIVE" | "INACTIVE";
};

export default function SubscriptionStatusBadge({ status }: Props) {
  if (status === "ACTIVE") {
    return (
      <Badge className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50">
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50"
    >
      Inactive
    </Badge>
  );
}
