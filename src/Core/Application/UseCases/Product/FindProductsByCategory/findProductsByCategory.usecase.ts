import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";
import { IFindProductsByCategoryUseCase } from "./findProductsByCategory.usecase.port";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

export class FindProductsByCategoryUseCase
  implements IFindProductsByCategoryUseCase
{
  constructor(private _productRepository: IProductRepository) {}
  execute(category: ProductCategory): Promise<Array<ProductEntity>> {
    return new Promise(async (resolve, reject) => {
      const products = await this._productRepository.findByCategory(category);
      resolve(products);
    });
  }
}
