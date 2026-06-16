import { Badge } from "@/components/ui/badge";

type Props = {
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
};

export default function SubscriptionStatusBadge({ status }: Props) {
  switch (status) {
    case "ACTIVE":
      return <Badge>{status}</Badge>;

    case "EXPIRED":
      return <Badge variant="secondary">{status}</Badge>;

    case "CANCELLED":
      return <Badge variant="destructive">{status}</Badge>;

    default:
      return <Badge>{status}</Badge>;
  }
}
