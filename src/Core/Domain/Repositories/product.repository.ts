import ProductEntity from "../Entities/product.entity";

export default interface IProductRepository {
  save(newProduct: ProductEntity): Promise<void>;
  find(): Promise<Array<ProductEntity>>;
  findById(id: string): Promise<ProductEntity>;
}
