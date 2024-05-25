import IProductInput from "Core/Application/Ports/Input/product.input";
import ICreateNewProductUseCase from "./createNewProduct.usecase.port";
import IProductRepository from "Core/Domain/Repositories/product.repository";
import ProductEntity from "Core/Domain/Entities/product.entity";

export default class CreateNewProductUseCase
  implements ICreateNewProductUseCase
{
  private _productInMemoryRepository: IProductRepository;

  construct(productInMemoryRepository: IProductRepository) {
    this._productInMemoryRepository = productInMemoryRepository;
  }

  async _execute(input: IProductInput): Promise<ProductEntity> {
    const newProduct = new ProductEntity(
      input.name,
      input.description,
      input.price,
      input.category
    );

    await new Promise((resolve, reject) => {
      this._productInMemoryRepository.save(newProduct);
      resolve(newProduct);
    });

    return newProduct;
  }
}
