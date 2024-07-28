import { UUID } from 'crypto';
import ProductCategory from 'core/enums/product-category.enum';

export interface IProductOutput {
  id: UUID;
  category: ProductCategory;
  name: string;
  price: number;
  description: string;  
}

export interface IOrderProductOutput {
  id: UUID;
  name: string;
  price: number;
  description: string;
}