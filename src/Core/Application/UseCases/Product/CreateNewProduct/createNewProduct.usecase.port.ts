import IProductInput from "Core/Application/Ports/Input/product.input";
import ProductEntity from "Core/Domain/Entities/product.entity";

export default interface ICreateNewProductUseCase {
  _execute(productInput: IProductInput): Promise<ProductEntity>;
}
