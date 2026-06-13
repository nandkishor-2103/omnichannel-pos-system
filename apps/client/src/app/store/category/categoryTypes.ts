export interface Category {
  id: string;
  name: string;
  description?: string;
  store?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    category: Category;
  };
}

export interface CategoriesResponse {
  statusCode: number;
  success: boolean;
  message: string;
  payload: {
    categories: Category[];
  };
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  storeId: string;
}

export interface UpdateCategoryPayload {
  id: string;
  dto: Partial<CreateCategoryPayload>;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
