import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import { IDeleteProductUseCase } from "./deleteProduct.usecase.port";
import { UUID } from 'crypto';

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(private _productRepository: IProductRepository) {}
  
  execute(id: UUID): void {
    this._productRepository.delete(id);
  }
}
