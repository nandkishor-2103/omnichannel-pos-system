import CustomerCard from "./CustomerCard";

export type Customer = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalOrders: number;
  totalSpent: number;
};

type CustomerListProps = {
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
};

const customerList: Customer[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    loyaltyPoints: 9,
    totalOrders: 10,
    totalSpent: 10000,
  },
  {
    id: 2,
    fullName: "Jane Doe",
    email: "janesedoe@example.com",
    phone: "1234567890",
    loyaltyPoints: 8,
    totalOrders: 8,
    totalSpent: 8000,
  },
  {
    id: 3,
    fullName: "Alice Johnson",
    email: "alicejohnson@example.com",
    phone: "0987654321",
    loyaltyPoints: 7,
    totalOrders: 9,
    totalSpent: 9000,
  },
  {
    id: 4,
    fullName: "Bob Smith",
    email: "bobsmith@example.com",
    phone: "01234567890",
    loyaltyPoints: 6,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 5,
    fullName: "Charlie Brown",
    email: "charliebrown@example.com",
    phone: "0234567890",
    loyaltyPoints: 5,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 6,
    fullName: "David White",
    email: "davidwhite@example.com",
    phone: "0345678901",
    loyaltyPoints: 8,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 7,
    fullName: "Eve Green",
    email: "evegreen@example.com",
    phone: "0456789012",
    loyaltyPoints: 9,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 8,
    fullName: "Frank Brown",
    email: "frankbrown@example.com",
    phone: "0567890123",
    loyaltyPoints: 8,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 9,
    fullName: "Grace White",
    email: "gracewhite@example.com",
    phone: "0678901234",
    loyaltyPoints: 4,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 10,
    fullName: "Henry Black",
    email: "henryblack@example.com",
    phone: "0789012345",
    loyaltyPoints: 3,
    totalOrders: 12,
    totalSpent: 12000,
  },
  {
    id: 11,
    fullName: "Isaac Red",
    email: "isaacred@example.com",
    phone: "0890123456",
    loyaltyPoints: 2,
    totalOrders: 2,
    totalSpent: 2000,
  },
  {
    id: 12,
    fullName: "Lily Green",
    email: "lilygreen@example.com",
    phone: "0901234567",
    loyaltyPoints: 6,
    totalOrders: 6,
    totalSpent: 6000,
  },
  {
    id: 13,
    fullName: "Mia Blue",
    email: "miablue@example.com",
    phone: "01012345678",
    loyaltyPoints: 7,
    totalOrders: 7,
    totalSpent: 7000,
  },
  {
    id: 14,
    fullName: "Noah Brown",
    email: "noahbrown@example.com",
    phone: "01123456789",
    loyaltyPoints: 6,
    totalOrders: 9,
    totalSpent: 9050,
  },
  {
    id: 15,
    fullName: "Olivia White",
    email: "oliviewhite@example.com",
    phone: "012234567890",
    loyaltyPoints: 8,
    totalOrders: 15,
    totalSpent: 15050,
  },
];

export default function CustomerList({ setSelectedCustomer }: CustomerListProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="divide-y">
        {customerList.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            setSelectedCustomer={setSelectedCustomer}
          />
        ))}
      </div>
    </div>
  );
}
