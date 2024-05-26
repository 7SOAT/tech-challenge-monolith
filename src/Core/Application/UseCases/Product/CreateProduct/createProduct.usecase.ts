import IProductInput from "Core/Application/Ports/Input/product.input";
import ICreateNewProductUseCase from "./createProduct.usecase.port";
import IProductRepository from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";

export class CreateProductUseCase implements ICreateNewProductUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(input: IProductInput): Promise<ProductEntity> {
    try {
      const newProduct = new ProductEntity(
        input.name,
        input.description,
        input.price,
        input.category
      );

      await new Promise((resolve, reject) => {
        this._productRepository.insert(newProduct);
        resolve(newProduct);
      });

      return newProduct;
    } catch (err) {
      throw err;
    }
  }
}
