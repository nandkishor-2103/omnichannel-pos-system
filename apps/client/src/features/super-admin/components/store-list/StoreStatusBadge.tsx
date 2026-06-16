import { Badge } from "@/components/ui/badge";

type Props = {
  status?: "PENDING" | "ACTIVE" | "BLOCKED" | "INACTIVE";
};

export default function StoreStatusBadge({ status }: Props) {
  switch (status) {
    case "ACTIVE":
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
      );

    case "PENDING":
      return (
        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
          Pending
        </Badge>
      );

    case "BLOCKED":
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Blocked</Badge>;

    case "INACTIVE":
      return (
        <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Inactive</Badge>
      );

    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
}
