import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export default interface IProductOutput {
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
}
