import ProductRepository from "@datasource/typeorm/repositories/product.repository";
import { ICreateProductInput, IUpdateProductInput } from '@type/input/product.input';
import ProductUseCase from "@usecases/product.usecase";
import ProductPresenter from "adapters/presenters/product.presenter";
import ProductEntity from "core/entities/product.entity";
import ProductCategory from "core/enums/product-category.enum";
import { UUID } from 'crypto';

export default class ProductController {
  private readonly _productUseCase = new ProductUseCase(this._productRepository)
  constructor(
    private _productRepository: ProductRepository
  ) { }

  async findOneProductById(id: UUID) {
    return ProductPresenter.Product(await this._productUseCase.findOneProductById(id));
  }

  async findAllProducts(): Promise<ProductEntity[]> { 
    return ProductPresenter.Products(await this._productUseCase.findAllProducts());
  }

  async findProductsByCategory(category: ProductCategory): Promise<ProductEntity[]> { 
    return ProductPresenter.Products(await this._productUseCase.findProductsByCategory(category));
  }

  async createProduct(product: ICreateProductInput) {   
    return await this._productUseCase.createProduct(product);
  }

  async updateProduct(id: UUID, productUpdate: IUpdateProductInput) {    
    return await this._productUseCase.updateProduct(id, productUpdate);
  }

  async deleteProduct(id: UUID) {    
    return await this._productUseCase.deleteProduct(id);
  }

}
