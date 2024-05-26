import ProductEntity from "Core/Domain/Entities/product.entity";

export interface IFindOneProductByIdUseCase {
  execute(id: string): Promise<ProductEntity>;
}
