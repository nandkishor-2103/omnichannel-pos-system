import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckIcon, Clock3, XIcon } from "lucide-react";

type Store = {
  id: number;
  storeName: string;
  ownerName: string;
  contact: string;
  businessType: string;
  submittedOn: string;
};

const stores: Store[] = [
  {
    id: 1,
    storeName: "FreshMart",
    ownerName: "Rahul Sharma",
    contact: "+91 9876543210",
    businessType: "Supermarket",
    submittedOn: "12 Jun 2026",
  },
  {
    id: 2,
    storeName: "Tech World",
    ownerName: "Priya Patel",
    contact: "+91 9876543211",
    businessType: "Electronics",
    submittedOn: "13 Jun 2026",
  },
  {
    id: 3,
    storeName: "Fashion Hub",
    ownerName: "Amit Verma",
    contact: "+91 9876543212",
    businessType: "Clothing",
    submittedOn: "14 Jun 2026",
  },
  {
    id: 4,
    storeName: "Daily Needs",
    ownerName: "Sneha Joshi",
    contact: "+91 9876543213",
    businessType: "Convenience Store",
    submittedOn: "15 Jun 2026",
  },
  {
    id: 5,
    storeName: "Mega Retail",
    ownerName: "Karan Mehta",
    contact: "+91 9876543214",
    businessType: "Retail Store",
    submittedOn: "16 Jun 2026",
  },
  {
    id: 6,
    storeName: "HealthCare",
    ownerName: "Rajendra Kumar",
    contact: "+91 9876543215",
    businessType: "Healthcare",
    submittedOn: "17 Jun 2026",
  },
  {
    id: 7,
    storeName: "Smart Bazaar",
    ownerName: "Neha Gupta",
    contact: "+91 9876543216",
    businessType: "Supermarket",
    submittedOn: "18 Jun 2026",
  },
  {
    id: 8,
    storeName: "Mobile Planet",
    ownerName: "Arjun Singh",
    contact: "+91 9876543217",
    businessType: "Electronics",
    submittedOn: "19 Jun 2026",
  },
  {
    id: 9,
    storeName: "Style Street",
    ownerName: "Pooja Nair",
    contact: "+91 9876543218",
    businessType: "Clothing",
    submittedOn: "20 Jun 2026",
  },
  {
    id: 10,
    storeName: "Family Mart",
    ownerName: "Vikram Desai",
    contact: "+91 9876543219",
    businessType: "Convenience Store",
    submittedOn: "21 Jun 2026",
  },
  {
    id: 11,
    storeName: "Urban Retail",
    ownerName: "Anjali Kulkarni",
    contact: "+91 9876543220",
    businessType: "Retail Store",
    submittedOn: "22 Jun 2026",
  },
  {
    id: 12,
    storeName: "MediPlus",
    ownerName: "Sanjay Rao",
    contact: "+91 9876543221",
    businessType: "Healthcare",
    submittedOn: "23 Jun 2026",
  },
  {
    id: 13,
    storeName: "Book Haven",
    ownerName: "Ritika Shah",
    contact: "+91 9876543222",
    businessType: "Book Store",
    submittedOn: "24 Jun 2026",
  },
  {
    id: 14,
    storeName: "Home Essentials",
    ownerName: "Manoj Patil",
    contact: "+91 9876543223",
    businessType: "Home & Kitchen",
    submittedOn: "25 Jun 2026",
  },
  {
    id: 15,
    storeName: "Sports Arena",
    ownerName: "Deepak Yadav",
    contact: "+91 9876543224",
    businessType: "Sports Store",
    submittedOn: "26 Jun 2026",
  },
  {
    id: 16,
    storeName: "Beauty Point",
    ownerName: "Kavita Sharma",
    contact: "+91 9876543225",
    businessType: "Cosmetics",
    submittedOn: "27 Jun 2026",
  },
];

export default function PendingRequest() {
  const handleAccept = () => {
    console.log("Store Accepted");
  };

  const handleReject = () => {
    console.log("Store Rejected");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pending Requests</h1>

          <p className="text-sm text-muted-foreground">
            Review and approve newly registered stores
          </p>
        </div>

        <Badge variant="secondary" className="gap-2 px-3 py-1 rounded-full">
          <Clock3 className="h-4 w-4" />
          {stores.length} Pending
        </Badge>
      </div>

      {/* Table */}

      <div className="max-h-[67vh] overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
            <TableRow>
              <TableHead>Store</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead>Submitted On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {stores.map((store) => (
              <TableRow key={store.id} className="hover:bg-muted/40 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium">{store.storeName}</p>
                    <p className="text-xs text-muted-foreground">ID #{store.id}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <p className="font-medium">{store.ownerName}</p>
                </TableCell>

                <TableCell className="text-muted-foreground">{store.contact}</TableCell>

                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {store.businessType}
                  </Badge>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {store.submittedOn}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      title="Approve Store"
                      onClick={handleAccept}
                      className="h-8 w-8 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 shadow-none cursor-pointer"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="outline"
                      title="Reject Store"
                      onClick={handleReject}
                      className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200 shadow-none cursor-pointer"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
