import ProductCategory from "core/enums/product-category.enum";

export interface ICreateProductInput {
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
}

export interface IUpdateProductInput {
  category?: ProductCategory;
  name?: string;
  price?: number;
  description?: string;
}