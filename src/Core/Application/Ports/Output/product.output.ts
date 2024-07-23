import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import { UUID } from 'crypto';

export default interface IProductOutput {
  id: UUID;
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
}
