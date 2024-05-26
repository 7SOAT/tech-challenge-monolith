import IProductInput from "Core/Application/Ports/Input/product.input";

export interface ICreateProductUseCase {
  execute(productInput: IProductInput): void;
}
