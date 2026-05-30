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

type CategoryDataType = {
  name: string;
  description: string;
  products: string;
};

const categories: CategoryDataType[] = [
  {
    name: "Electronics",
    description: "Mobile phones, laptops, accessories, and gadgets.",
    products: "120",
  },
  {
    name: "Clothing",
    description: "Men's, women's, and kids' apparel.",
    products: "85",
  },
  {
    name: "Footwear",
    description: "Casual, sports, and formal shoes.",
    products: "60",
  },
  {
    name: "Groceries",
    description: "Daily essentials and household food items.",
    products: "250",
  },
  {
    name: "Vegetables",
    description: "Fresh vegetables sourced daily.",
    products: "45",
  },
  {
    name: "Fruits",
    description: "Seasonal and imported fresh fruits.",
    products: "40",
  },
  {
    name: "Dairy",
    description: "Milk, cheese, butter, and dairy products.",
    products: "35",
  },
  {
    name: "Beverages",
    description: "Soft drinks, juices, tea, and coffee.",
    products: "70",
  },
  {
    name: "Bakery",
    description: "Bread, cakes, pastries, and cookies.",
    products: "55",
  },
  {
    name: "Beauty & Personal Care",
    description: "Skincare, haircare, and grooming products.",
    products: "95",
  },
  {
    name: "Health & Wellness",
    description: "Health supplements and wellness products.",
    products: "50",
  },
  {
    name: "Home & Kitchen",
    description: "Kitchenware and household essentials.",
    products: "110",
  },
  {
    name: "Furniture",
    description: "Home and office furniture products.",
    products: "30",
  },
  {
    name: "Stationery",
    description: "Office and school stationery items.",
    products: "65",
  },
  {
    name: "Books",
    description: "Educational, fiction, and non-fiction books.",
    products: "140",
  },
  {
    name: "Toys & Games",
    description: "Kids toys, puzzles, and board games.",
    products: "75",
  },
  {
    name: "Sports & Fitness",
    description: "Sports equipment and fitness accessories.",
    products: "58",
  },
  {
    name: "Automotive",
    description: "Vehicle accessories and maintenance products.",
    products: "42",
  },
  {
    name: "Pet Supplies",
    description: "Food, toys, and accessories for pets.",
    products: "37",
  },
  {
    name: "Jewelry & Accessories",
    description: "Fashion jewelry, watches, and accessories.",
    products: "48",
  },
];

type CategoryTableProps = {
  onEdit: (category: CategoryDataType) => void;
};

const truncateWords = (text: string, count: number) =>
  text.split(" ").slice(0, count).join(" ") +
  (text.split(" ").length > count ? "..." : "");

export default function CategoryTable({ onEdit }: CategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Category Name</TableHead>
          <TableHead className="font-semibold">Description</TableHead>
          <TableHead className="font-semibold">Products</TableHead>
          <TableHead className="text-right font-semibold">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.name} className="transition-colors hover:bg-muted/30">
            <TableCell>{category.name}</TableCell>

            <TableCell>{truncateWords(category.description, 6)}</TableCell>

            <TableCell>{category.products}</TableCell>

            <TableCell className="text-right space-x-1">
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => onEdit(category)}
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
