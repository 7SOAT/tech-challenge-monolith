import ProductEntity from "@entities/product.entity";
import ProductCategory from "@enums/product-category.enum";
import IProductGateway from "@interfaces/datasource/product.gateway";
import { ICreateProductInput, IUpdateProductInput } from "@type/input/product.input";
import { UUID } from "crypto";

export default class ProductUseCase {
  constructor(private _productGateway: IProductGateway) { }

  async updateProduct(id: UUID, input: IUpdateProductInput): Promise<ProductEntity> {
    const product = new ProductEntity(
      input.name,
      input.description,
      input.price,
      input.category,
      id
    );

    await this._productGateway.update(id, product);

    return product;
  }

  async findProductsByCategory(category: ProductCategory): Promise<Array<ProductEntity>> {
    return await this._productGateway.findByCategory(category);
  }

  async findOneProductById(id: UUID): Promise<ProductEntity> {
    try {
      return await this._productGateway.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllProducts(): Promise<Array<ProductEntity>> {
    return new Promise(async (resolve, reject) => {
      const products = await this._productGateway.findAll();
      resolve(products);
    });
  }

  async deleteProduct(id: UUID): Promise<void> {
    this._productGateway.delete(id);
  }

  async createProduct(input: ICreateProductInput): Promise<ProductEntity> {
    try {
      const newProduct = new ProductEntity(
        input.name,
        input.description,
        input.price,
        input.category
      );

      return await this._productGateway.insert(newProduct);
    } catch (err) {
      throw err;
    }
  }
}