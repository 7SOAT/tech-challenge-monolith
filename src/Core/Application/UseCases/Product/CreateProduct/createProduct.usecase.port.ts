import IProductInput from "Core/Application/Ports/Input/product.input";
import ProductEntity from "Core/Domain/Entities/product.entity";

export default interface ICreateProductUseCase {
  execute(productInput: IProductInput): Promise<ProductEntity>;
}
