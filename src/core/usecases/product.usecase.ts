import { UUID } from "crypto";
import ProductEntity from "core/entities/product.entity";
import ProductCategory from "core/enums/product-category.enum";
import IProductGateway from "@interfaces/gateways/product.gateway";
import IProductInput from "core/types/input/product.input";

export default class ProductUseCase {
  constructor(private _productGateway: IProductGateway) { }

  async updateProduct(id: UUID, input: IProductInput): Promise<void> {
    const product = new ProductEntity(
      input.name,
      input.description,
      input.price,
      input.category,
      id
    );

    await this._productGateway.update(id, product);
  }

  async findProductsByCategory(category: ProductCategory): Promise<Array<ProductEntity>> {
    return await this._productGateway.findByCategory(category);
  }

  async findOneProductByIdUseCase(id: UUID): Promise<ProductEntity> {
    try {
      return await this._productGateway.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllProductsUseCase(): Promise<Array<ProductEntity>> {
    return new Promise(async (resolve, reject) => {
      const products = await this._productGateway.findAll();
      resolve(products);
    });
  }

  async deleteProductUseCase(id: UUID): Promise<void> {
    this._productGateway.delete(id);
  }

  async createProductUseCase(input: IProductInput): Promise<void> {
    try {
      const newProduct = new ProductEntity(
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

  async validateProducts(productIds: UUID[]): Promise<ProductEntity[]> {
    return await Promise.all(productIds.map(async productId => {
      const resultProduct: ProductEntity = await this._productGateway.findOneById(productId);

      if (!resultProduct) {
        throw new Error(`Product not found: ${productId}`);
      }

      return resultProduct;
    }));
  }
}