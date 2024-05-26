import IProductInput from "Core/Application/Ports/Input/product.input";

export default interface IUpdateProductUseCase {
  execute(id: string, input: IProductInput): void;
}
