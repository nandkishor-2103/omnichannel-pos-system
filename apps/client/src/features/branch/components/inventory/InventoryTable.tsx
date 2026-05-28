import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";

type Inventory = {
  id: number;
  name: string;
  quantity: number;
  category: string;
  sku: string;
};

type InventoryTableProps = {
  setIsEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const inventories: Inventory[] = [
  {
    id: 12345,
    name: "Cabbage",
    quantity: 34,
    category: "Vegetables",
    sku: "CAB-234",
  },
];

export default function InventoryTable({ setIsEditDialogOpen }: InventoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold">
          <TableHead>SKU</TableHead>

          <TableHead>Product Name</TableHead>

          <TableHead>Quantity</TableHead>

          <TableHead>Category</TableHead>

          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {inventories.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.sku}</TableCell>

            <TableCell>{item.name}</TableCell>

            <TableCell>{item.quantity}</TableCell>

            <TableCell>{item.category}</TableCell>

            <TableCell className="text-right">
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                variant={"outline"}
                size={"icon"}
                className="cursor-pointer"
              >
                <Edit />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
