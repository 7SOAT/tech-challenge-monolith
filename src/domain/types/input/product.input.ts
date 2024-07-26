import { ProductCategory } from "domain/enums/productCategory.enum";

export default interface IProductInput {
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
}