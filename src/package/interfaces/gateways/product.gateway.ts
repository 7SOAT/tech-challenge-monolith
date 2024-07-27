import { UUID } from 'crypto';
import ProductCategory from 'core/enums/product-category.enum';
import ProductEntity from 'core/entities/product.entity';

export default interface IProductGateway {
  insert(product: ProductEntity): void;
  update(id: UUID, product: ProductEntity): void;
  delete(id: UUID): void;
  findAll(): Promise<Array<ProductEntity>>;
  findOneById(id: UUID): Promise<ProductEntity>;
  findByCategory(category: ProductCategory): Promise<Array<ProductEntity>>;
}
