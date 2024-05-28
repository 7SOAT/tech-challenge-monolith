import ProductEntity from 'Core/Domain/Entities/product.entity';
import { IFindOneProductByIdUseCase } from './findOneProductById.usecase.port';
import { IProductRepository } from 'Core/Domain/Repositories/product.repository';

export class FindOneProductByIdUseCase implements IFindOneProductByIdUseCase {
  constructor(private _productRepository: IProductRepository) {}

  async execute(id: string): Promise<ProductEntity> {
    try {
      const product = await this._productRepository.findOneById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }
}
