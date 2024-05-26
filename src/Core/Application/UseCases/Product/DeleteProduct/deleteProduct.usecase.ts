import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import { IDeleteProductUseCase } from "./deleteProduct.usecase.port";

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(private _productRepository: IProductRepository) {}
  execute(id: string): void {
    this._productRepository.delete(id);
  }
}
