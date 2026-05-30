import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2Icon } from "lucide-react";

type BranchDataType = {
  name: string;
  address: string;
  managerName: string;
  phone: string;
};

const branches: BranchDataType[] = [
  {
    name: "Downtown Branch",
    address: "123 Main Street, Mumbai",
    managerName: "Rahul Sharma",
    phone: "9876543210",
  },
  {
    name: "Westside Branch",
    address: "45 MG Road, Pune",
    managerName: "Priya Patel",
    phone: "9876543211",
  },
  {
    name: "Central Branch",
    address: "78 Station Road, Nashik",
    managerName: "Amit Verma",
    phone: "9876543212",
  },
  {
    name: "North Branch",
    address: "12 Market Lane, Thane",
    managerName: "Sneha Joshi",
    phone: "9876543213",
  },
  {
    name: "South Branch",
    address: "56 Lake View Road, Nagpur",
    managerName: "Vikram Singh",
    phone: "9876543214",
  },
  {
    name: "East Branch",
    address: "90 Ring Road, Aurangabad",
    managerName: "Neha Gupta",
    phone: "9876543215",
  },
  {
    name: "City Center Branch",
    address: "21 Civil Lines, Solapur",
    managerName: "Rohit Kulkarni",
    phone: "9876543216",
  },
  {
    name: "Metro Branch",
    address: "67 Business Park, Navi Mumbai",
    managerName: "Anjali Mehta",
    phone: "9876543217",
  },
  {
    name: "Garden Branch",
    address: "34 Green Avenue, Kolhapur",
    managerName: "Karan Deshmukh",
    phone: "9876543218",
  },
  {
    name: "Airport Branch",
    address: "11 Airport Road, Pune",
    managerName: "Pooja Nair",
    phone: "9876543219",
  },
  {
    name: "Lakeside Branch",
    address: "88 Lake Road, Nagpur",
    managerName: "Arjun Patil",
    phone: "9876543220",
  },
  {
    name: "Industrial Branch",
    address: "15 MIDC Area, Nashik",
    managerName: "Meera Shah",
    phone: "9876543221",
  },
  {
    name: "Heritage Branch",
    address: "42 Fort Road, Mumbai",
    managerName: "Sanjay Rao",
    phone: "9876543222",
  },
  {
    name: "Market Branch",
    address: "73 Bazaar Street, Thane",
    managerName: "Kavita Yadav",
    phone: "9876543223",
  },
  {
    name: "Tech Park Branch",
    address: "101 IT Hub, Pune",
    managerName: "Nikhil Joshi",
    phone: "9876543224",
  },
];

type BranchTableProps = {
  onEdit: (branch: BranchDataType) => void;
};

export default function BranchTable({ onEdit }: BranchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Branch Name</TableHead>
          <TableHead className="font-semibold">Address</TableHead>
          <TableHead className="font-semibold">Manager</TableHead>
          <TableHead className="font-semibold">Phone</TableHead>
          <TableHead className="text-right font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.phone} className="transition-colors hover:bg-muted/30">
            <TableCell>{branch.name}</TableCell>

            <TableCell>{branch.address}</TableCell>

            <TableCell>{branch.managerName}</TableCell>

            <TableCell>{branch.phone}</TableCell>

            <TableCell className="text-right space-x-1">
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => onEdit(branch)}
              >
                <Edit />
              </Button>
              <Button
                variant={"outline"}
                className="cursor-pointer hover:text-red-500"
                // onClick={() => onEdit(branch)}
              >
                <Trash2Icon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
