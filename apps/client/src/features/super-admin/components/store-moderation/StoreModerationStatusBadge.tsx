import { Badge } from "@/components/ui/badge";

type Props = {
  status?: "PENDING" | "ACTIVE" | "BLOCKED" | "INACTIVE";
};

export default function StoreModerationStatusBadge({ status }: Props) {
  switch (status) {
    case "PENDING":
      return (
        <Badge className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-50">
          Pending
        </Badge>
      );

    case "BLOCKED":
      return (
        <Badge className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50">
          Blocked
        </Badge>
      );

    case "ACTIVE":
      return (
        <Badge className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50">
          Active
        </Badge>
      );

    case "INACTIVE":
      return (
        <Badge className="border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-100">
          Inactive
        </Badge>
      );

    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
