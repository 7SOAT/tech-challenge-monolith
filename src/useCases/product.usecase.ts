import { UUID } from "crypto";
import IProductGateway from "domain/interfaces/gateways/product.gateway";
import ProductCategory from "domain/enums/productCategory.enum";
import IProductInput from "domain/types/input/product.input";
import ProductModel from "domain/models/product.model";

export default class ProductUseCase {
    constructor(private _productGateway: IProductGateway) { }

    updateProduct(id: UUID, input: IProductInput): void {
        const product = new ProductModel(
            input.name,
            input.description,
            input.price,
            input.category
        );

        this._productGateway.update(id, product);
    }

    findProductsByCategory(category: ProductCategory): Promise<Array<ProductModel>> {
        return new Promise(async (resolve, reject) => {
          const products = await this._productGateway.findByCategory(category);
          resolve(products);
        });
      }

      async findOneProductByIdUseCase(id: UUID): Promise<ProductModel> {
        try {
          return await this._productGateway.findOneById(id);
        } catch (error) {
          throw error;
        }
      }

      async findAllProductsUseCase(): Promise<Array<ProductModel>> {
        return new Promise(async (resolve, reject) => {
          const products = await this._productGateway.findAll();
          resolve(products);
        });
      }

      async deleteProductUseCase(id: UUID):Promise<void> {
        this._productGateway.delete(id);
      }

      async createProductUseCase(input: IProductInput): Promise<void> {
        try {
          const newProduct = new ProductModel(
            input.name,
            input.description,
            input.price,
            input.category
          );
    
          this._productGateway.insert(newProduct);
        } catch (err) {
          throw err;
        }
      }

      async validateProducts(productIds: UUID[]): Promise<ProductModel[]> {
        return await Promise.all(productIds.map(async productId => {
          const resultProduct: ProductModel = await this._productGateway.findOneById(productId);
    
          if (!resultProduct) {
            throw new Error(`Product not found: ${productId}`);
          }
    
          return resultProduct;
        }));
      }
}