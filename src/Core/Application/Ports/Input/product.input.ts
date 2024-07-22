import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export default interface IProductInput {
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
}
