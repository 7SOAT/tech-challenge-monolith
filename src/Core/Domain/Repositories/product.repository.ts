import ProductEntity from "../Entities/product.entity";

export interface IProductRepository {
  insert(product: ProductEntity): void;
  update(id: string, product: ProductEntity): void;
}
