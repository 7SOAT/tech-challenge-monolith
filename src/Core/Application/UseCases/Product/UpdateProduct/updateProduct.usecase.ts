import IProductInput from "Core/Application/Ports/Input/product.input";
import ProductEntity from "Core/Domain/Entities/product.entity";
import IUpdateProductUseCase from "./updateProduct.usecase.port";
import IProductRepository from "Core/Domain/Repositories/product.repository";

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(id: string, input: IProductInput): Promise<ProductEntity> {
    const product = new ProductEntity(
      input.name,
      input.description,
      input.price,
      input.category
    );

    return new Promise((resolve, reject) => {
      this._productRepository.update(id, product);
      resolve(product);
    });
  }
}
