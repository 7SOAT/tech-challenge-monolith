import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export default interface IProductOutput {
  id: string;
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
