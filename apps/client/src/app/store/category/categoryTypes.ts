export interface Category {
  _id: string;
  name: string;
  description?: string;
  storeId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryResponse {
  category: Category;
  message?: string;
}

export interface CategoriesResponse {
  categories: Category[];
  message?: string;
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
