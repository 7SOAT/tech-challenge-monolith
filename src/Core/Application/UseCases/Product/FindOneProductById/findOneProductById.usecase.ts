import ProductEntity from 'Core/Domain/Entities/product.entity';
import { IFindOneProductByIdUseCase } from './findOneProductById.usecase.port';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';
import { UUID } from 'crypto';

export class FindOneProductByIdUseCase implements IFindOneProductByIdUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(id: UUID): Promise<ProductEntity> {
    try {
      const product = await this._productRepository.findOneById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
}
