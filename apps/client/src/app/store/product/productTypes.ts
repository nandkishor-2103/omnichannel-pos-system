export interface ProductCategory {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;

  name: string;
  sku: string;

  description?: string;

  mrp: number;
  sellingPrice: number;

  availableQuantity: number;

  brand?: string;
  image?: string;

  category?: ProductCategory;

  store?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    product: Product;
  };
}

export interface ProductsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    products: Product[];
  };
}

export interface CreateProductPayload {
  name: string;
  sku: string;

  description?: string;

  mrp: number;
  sellingPrice: number;

  brand?: string;
  image?: string;

  category: string;
  store: string;
}

export interface UpdateProductPayload {
  id: string;
  dto: Partial<CreateProductPayload>;
}

export interface SearchProductsPayload {
  query: string;
  storeId: string | undefined;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  searchResults: Product[];

  loading: boolean;
  error: string | undefined | null;
}
