import { UUID } from 'crypto';
import ProductCategory from 'domain/enums/productCategory.enum';

export default interface IProductOutput {
  id: UUID;
  category: ProductCategory;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
}
