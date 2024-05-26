import IProductInput from "Core/Application/Ports/Input/product.input";

export interface ICreateProductUseCase {
  _execute(productInput: IProductInput): void;
}
