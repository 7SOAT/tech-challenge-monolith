import ProductEntity from "Core/Domain/Entities/product.entity";
import { ProductCategory } from "Core/Domain/Enums/productCategory.enum";

export interface IFindProductsByCategoryUseCase {
  execute(category: ProductCategory): Promise<Array<ProductEntity>>;
}
