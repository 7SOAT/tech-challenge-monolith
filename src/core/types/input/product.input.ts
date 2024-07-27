import ProductCategory from "core/enums/product-category.enum";

export default interface IProductInput {
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
}