import IProductInput from "Core/Application/Ports/Input/product.input";
import { ICreateProductUseCase } from "./createProduct.usecase.port";
import { IProductRepository } from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  execute(input: IProductInput): void {
    try {
      const newProduct = new ProductEntity(
        input.name,
        input.description,
        input.price,
        input.category
      );

      this._productRepository.insert(newProduct);
    } catch (err) {
      throw err;
    }
  }
}
