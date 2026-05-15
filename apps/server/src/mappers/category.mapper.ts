import type { ICategory } from "../models/category.model.js";

export const mapCategoryToResponse = (category: ICategory) => {
  return {
    id: category._id,

    name: category.name,

    store: category.store,

    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};
