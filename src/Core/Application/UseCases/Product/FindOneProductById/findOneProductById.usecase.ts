import ProductEntity from "Core/Domain/Entities/product.entity";
import { IFindOneProductByIdUseCase } from "./findOneProductById.usecase.port";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export class FindOneProductByIdUseCase implements IFindOneProductByIdUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    return await new Promise((resolve, reject) => {
      const product = this._productRepository.findOneById(id);
      resolve(product);
    });
  }
}
