import IProductInput from "Core/Application/Ports/Input/product.input";
import ProductEntity from "Core/Domain/Entities/product.entity";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";

import IUpdateProductUseCase from "./updateProduct.usecase.port";

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  execute(id: string, input: IProductInput): void {
    const product = new ProductEntity(
      input.name,
      input.description,
      input.price,
      input.category
    );

    this._productRepository.update(id, product);
  }
}
