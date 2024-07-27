import { UUID } from 'crypto';
import ProductCategory from '@enums/product-category.enum';
import ProductModel from '@entities/product.model';

export default interface IProductGateway {
  insert(product: ProductModel): void;
  update(id: UUID, product: ProductModel): void;
  delete(id: UUID): void;
  findAll(): Promise<Array<ProductModel>>;
  findOneById(id: UUID): Promise<ProductModel>;
  findByCategory(category: ProductCategory): Promise<Array<ProductModel>>;
}
