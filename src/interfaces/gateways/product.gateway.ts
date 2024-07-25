import { UUID } from 'crypto';
import ProductEntity from "../../Entities/product.entity";
import { ProductCategory } from "../../enums/productCategory.enum";

export interface IProductRepository {
  insert(product: ProductEntity): void;
  update(id: UUID, product: ProductEntity): void;
  delete(id: UUID): void;
  findAll(): Promise<Array<ProductEntity>>;
  findOneById(id: UUID): Promise<ProductEntity>;
  findByCategory(category: ProductCategory): Promise<Array<ProductEntity>>;
}
