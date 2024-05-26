import ProductEntity from "../Entities/product.entity";

export default interface IProductRepository {
  insert(product: ProductEntity): Promise<void>;
  update(id: string, product: ProductEntity): Promise<void>;
  find(): Promise<Array<ProductEntity>>;
  findById(id: string): Promise<ProductEntity>;
}
