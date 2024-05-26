import ProductEntity from "../Entities/product.entity";
import { ProductCategory } from "../Enums/productCategory.enum";

export interface IProductRepository {
  insert(product: ProductEntity): void;
  update(id: string, product: ProductEntity): void;
  delete(id: string): void;
  find(): Promise<Array<ProductEntity>>;
  findOneById(id: string): Promise<ProductEntity>;
  findByCategory(category: ProductCategory): Promise<Array<ProductEntity>>;
}
