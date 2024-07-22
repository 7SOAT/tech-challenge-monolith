import IProductInput from "Core/Application/Ports/Input/product.input";
import { UUID } from 'crypto';

export default interface IUpdateProductUseCase {
  execute(id: UUID, input: IProductInput): void;
}
