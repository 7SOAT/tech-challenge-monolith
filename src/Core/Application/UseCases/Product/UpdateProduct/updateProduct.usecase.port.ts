import IProductInput from "Core/Application/Ports/Input/product.input";
import ProductEntity from "Core/Domain/Entities/product.entity";

export default interface IUpdateProductUseCase {
  execute(id: string, input: IProductInput): Promise<ProductEntity>;
}
