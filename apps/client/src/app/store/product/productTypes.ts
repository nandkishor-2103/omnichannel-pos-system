export interface Product {
  _id: string;
  name: string;
  sku?: string;
  barcode?: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId?: string;
  storeId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductResponse {
  product: Product;
  message?: string;
}

export interface ProductsResponse {
  products: Product[];
  message?: string;
}

export interface CreateProductPayload {
  name: string;
  price: number;
  sku?: string;
  barcode?: string;
  description?: string;
  stock?: number;
  categoryId?: string;
}

export interface UpdateProductPayload {
  id: string;
  dto: Partial<CreateProductPayload>;
}

export interface SearchProductsPayload {
  query: string;
  storeId: string;
}

export interface ProductState {
  products: Product[];
  product: Product | null;
  searchResults: Product[];
  loading: boolean;
  error: string | null;
}
