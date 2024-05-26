import ProductEntity from "Core/Domain/Entities/product.entity";

export interface IFindAllProductsUseCase {
  execute(): Promise<Array<ProductEntity>>;
}
