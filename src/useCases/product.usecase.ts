import { UUID } from "crypto";
import ProductEntity from "entities/product.entity";
import { ProductCategory } from "enums/productCategory.enum";
import { IProductRepository } from "interfaces/gateways/product.gateway";
import IProductInput from "types/input/product.input";

export class ProductUseCase {
    constructor(private _productRepository: IProductRepository) { }

    updateProduct(id: UUID, input: IProductInput): void {
        const product = new ProductEntity(
            input.name,
            input.description,
            input.price,
            input.category
        );

        this._productRepository.update(id, product);
    }

    findProductsByCategory(category: ProductCategory): Promise<Array<ProductEntity>> {
        return new Promise(async (resolve, reject) => {
          const products = await this._productRepository.findByCategory(category);
          resolve(products);
        });
      }

      async findOneProductByIdUseCase(id: UUID): Promise<ProductEntity> {
        try {
          return await this._productRepository.findOneById(id);
        } catch (error) {
          throw error;
        }
      }

      async findAllProductsUseCase(): Promise<Array<ProductEntity>> {
        return new Promise(async (resolve, reject) => {
          const products = await this._productRepository.findAll();
          resolve(products);
        });
      }

      async deleteProductUseCase(id: UUID):Promise<void> {
        this._productRepository.delete(id);
      }

      async createProductUseCase(input: IProductInput): Promise<void> {
        try {
          const newProduct = new ProductEntity(
            input.name,
            input.description,
            input.price,
            input.category
          );
    
          this._productRepository.insert(newProduct);
        } catch (err) {
          throw err;
        }
      }

      async validateProducts(productIds: UUID[]): Promise<ProductEntity[]> {
        return await Promise.all(productIds.map(async productId => {
          const resultProduct: ProductEntity = await this._productRepository.findOneById(productId);
    
          if (!resultProduct) {
            throw new Error(`Product not found: ${productId}`);
          }
    
          return resultProduct;
        }));
      }
}