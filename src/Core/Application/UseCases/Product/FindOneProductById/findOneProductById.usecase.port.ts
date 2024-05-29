import ProductEntity from "Core/Domain/Entities/product.entity";
import { UUID } from "crypto";

export interface IFindOneProductByIdUseCase {
  execute(id: UUID): Promise<ProductEntity>;
}
