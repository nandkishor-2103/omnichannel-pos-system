import { useState } from "react";
import { Barcode, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

import ProductCard from "@/features/cashier/components/product-section/ProductCard";

type Product = {
  id: number;
  image: string;
  name: string;
  sku: string;
  sellingPrice: number;
  category: string;
};

const products: Product[] = [
  {
    id: 1,
    image:
      "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTBtDXt7Sj_bYl2raH5lsRXABh2cWMCOui-ARQSsxvzgWneFNzUHCpRrzadKejOkT-Hex37SFmGGGceQVZtK77uptdfSseH73P8cn5gI-cQJPRGfqr_k14O",
    name: "Men's Shirt",
    sku: "MSHIRT001",
    sellingPrice: 499,
    category: "Clothing",
  },

  {
    id: 2,
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR0tYImQ0HnSilLifpk5-NyVUHd2AX6xQsMnMWxDdj-Gq3lgUkpIiFnKTzOTkLGfpyko7AgLcszRD-APZ5Nf2vFoI4cUubTH_d78r-MVq3W8fMSpxkawY6DQA",
    name: "Men Jeans",
    sku: "MJEANS001",
    sellingPrice: 699,
    category: "Clothing",
  },

  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/61xrIAiNe9L._AC_UL480_FMwebp_QL65_.jpg",
    name: "Grapes",
    sku: "GRAPES001",
    sellingPrice: 80,
    category: "Fruits",
  },

  {
    id: 4,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-01-03T171511.626.png?v=1753427070&width=500",
    name: "Tomatoes",
    sku: "TOMATOES001",
    sellingPrice: 30,
    category: "Vegetables",
  },

  {
    id: 5,
    image:
      "https://zamaorganics.com/cdn/shop/files/organic_palak.png?v=1766560467&width=500",
    name: "Palak",
    sku: "PALAK001",
    sellingPrice: 40,
    category: "Vegetables",
  },
  {
    id: 6,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-01-12T155323.186.png?v=1752746510&width=500",
    name: "Carrot",
    sku: "CARROT001",
    sellingPrice: 20,
    category: "Vegetables",
  },
  {
    id: 7,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-02-10T155609.000.png?v=1752902125&width=500",
    name: "Onion",
    sku: "ONION001",
    sellingPrice: 15,
    category: "Vegetables",
  },
  {
    id: 8,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-01-04T161500.512.png?v=1752747810&width=500",
    name: "Potato",
    sku: "POTATO001",
    sellingPrice: 10,
    category: "Vegetables",
  },
  {
    id: 9,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-01-04T162801.022.png?v=1752747444&width=500",
    name: "Cauliflower",
    sku: "CAULIFLOWER001",
    sellingPrice: 20,
    category: "Vegetables",
  },
  {
    id: 10,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign-2024-01-04T162448.132.png?v=1753427852&width=500",
    name: "Capsicum",
    sku: "CAPSUMIC001",
    sellingPrice: 30,
    category: "Vegetables",
  },
  {
    id: 11,
    image:
      "https://zamaorganics.com/cdn/shop/files/Untitleddesign_90_9e92041f-0543-419b-9d5b-aae936a6f8ad.png?v=1753427921&width=500",
    name: "Broccoli",
    sku: "BROCCOLI001",
    sellingPrice: 20,
    category: "Vegetables",
  },
];

export default function ProductSection() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-2/5 flex flex-col bg-card border-r">
      <div className="p-4 border-b bg-muted">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            className="p-5 pl-10 focus-visible:ring-green-500"
            value={searchTerm}
            type="text"
            onChange={handleSearchChange}
            placeholder="Search products..."
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-2 border-b">
        <span>{2} products found</span>
        <Button variant="outline" size="sm" className="text-xs">
          <Barcode className="mr-1 h-4 w-4" />
          Scan
        </Button>
      </div>

      {/* Scrollable Products */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-3 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
