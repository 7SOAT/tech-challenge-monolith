import ProductEntity from "Core/Domain/Entities/product.entity";
import { IFindAllProductsUseCase } from "./findAllProducts.usecase.port";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export class FindAllProductsUseCase implements IFindAllProductsUseCase {
  constructor(private _productRepository: IProductRepository) {}

  execute(): Promise<Array<ProductEntity>> {
    return new Promise(async (resolve, reject) => {
      const products = await this._productRepository.find();
      resolve(products);
    });
  }
}
