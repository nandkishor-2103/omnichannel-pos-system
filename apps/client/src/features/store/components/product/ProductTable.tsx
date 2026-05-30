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



type ProductDataType = {
  image: string;
  name: string;
  category: string;
  price: string;
  stock: string;
};

const products: ProductDataType[] = [
  {
    image: "https://picsum.photos/100?random=1",
    name: "Apple iPhone 15",
    category: "Electronics",
    price: "₹79,999",
    stock: "25",
  },
  {
    image: "https://picsum.photos/100?random=2",
    name: "Samsung Galaxy S24",
    category: "Electronics",
    price: "₹74,999",
    stock: "18",
  },
  {
    image: "https://picsum.photos/100?random=3",
    name: "Nike Air Max",
    category: "Footwear",
    price: "₹5,499",
    stock: "40",
  },
  {
    image: "https://picsum.photos/100?random=4",
    name: "Adidas Running Shoes",
    category: "Footwear",
    price: "₹4,999",
    stock: "32",
  },
  {
    image: "https://picsum.photos/100?random=5",
    name: "Sony WH-1000XM5",
    category: "Electronics",
    price: "₹29,999",
    stock: "12",
  },
  {
    image: "https://picsum.photos/100?random=6",
    name: "Dell Inspiron 15",
    category: "Computers",
    price: "₹62,999",
    stock: "10",
  },
  {
    image: "https://picsum.photos/100?random=7",
    name: "HP Pavilion Laptop",
    category: "Computers",
    price: "₹58,999",
    stock: "14",
  },
  {
    image: "https://picsum.photos/100?random=8",
    name: "Boat Rockerz 550",
    category: "Accessories",
    price: "₹1,999",
    stock: "60",
  },
  {
    image: "https://picsum.photos/100?random=9",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: "₹8,999",
    stock: "20",
  },
  {
    image: "https://picsum.photos/100?random=10",
    name: "Apple Watch Series 9",
    category: "Wearables",
    price: "₹39,999",
    stock: "15",
  },
  {
    image: "https://picsum.photos/100?random=11",
    name: "Samsung Galaxy Watch 6",
    category: "Wearables",
    price: "₹24,999",
    stock: "22",
  },
  {
    image: "https://picsum.photos/100?random=12",
    name: "Canon EOS R50",
    category: "Cameras",
    price: "₹74,500",
    stock: "8",
  },
  {
    image: "https://picsum.photos/100?random=13",
    name: "Puma Sports T-Shirt",
    category: "Clothing",
    price: "₹1,299",
    stock: "75",
  },
  {
    image: "https://picsum.photos/100?random=14",
    name: "Levi's Slim Fit Jeans",
    category: "Clothing",
    price: "₹2,499",
    stock: "35",
  },
  {
    image: "https://picsum.photos/100?random=15",
    name: "Wildcraft Backpack",
    category: "Bags",
    price: "₹1,799",
    stock: "28",
  },
];

type BranchTableProps = {
  onEdit: (product: ProductDataType) => void;
};

export default function ProductTable({ onEdit }: BranchTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Image</TableHead>
          <TableHead className="font-semibold">Product Name</TableHead>
          <TableHead className="font-semibold">Category</TableHead>
          <TableHead className="font-semibold">Price</TableHead>
          <TableHead className="font-semibold">Stock</TableHead>
          <TableHead className="text-right font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name} className="transition-colors hover:bg-muted/30">
            <TableCell>
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded-md object-cover border"
              />
            </TableCell>

            <TableCell>{product.name}</TableCell>

            <TableCell>{product.category}</TableCell>

            <TableCell>{product.price}</TableCell>

            <TableCell>{product.stock}</TableCell>

            <TableCell className="text-right space-x-1">
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => onEdit(product)}
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
