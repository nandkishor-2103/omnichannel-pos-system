export interface CreateProductDto {
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

export interface UpdateProductDto {
  name?: string;
  sku?: string;
  description?: string;

  mrp?: number;
  sellingPrice?: number;

  brand?: string;
  image?: string;

  category?: string;
}
