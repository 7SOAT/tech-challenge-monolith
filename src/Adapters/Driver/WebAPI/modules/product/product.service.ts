import { Injectable, Logger } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";

import CreateNewProductUseCase from "../../../../../Core/Application/UseCases/Product/CreateNewProduct/createNewProduct.usecase";

@Injectable()
export class ProductService {
  constructor(private readonly logger: Logger) {}

  // async findAll() {
  //   try {
  //     this.logger.log(`This action returns all product`);
  //     return this.productRepository.find();
  //   } catch (error) {
  //     this.logger.error(`Error returning all product: ${error}`);
  //   }
  // }

  // async findById(productId: string) {
  //   try {
  //     this.logger.log(`This action returns product with specific id`);
  //     return this.productRepository.findOneBy({ id: productId });
  //   } catch (error) {
  //     this.logger.error(`Error returning product by id: ${error}`);
  //   }
  // }

  // async findByCategory(productCategory: ProductCategory) {
  //   try {
  //     this.logger.log(
  //       `This action returns all product in "${productCategory}" category`
  //     );
  //     return this.productRepository.findBy({ category: productCategory });
  //   } catch (error) {
  //     this.logger.error(`Error returning all product by category: ${error}`);
  //   }
  // }

  // async save(createProductDto: CreateProductDto) {
  //   try {
  //     return await this.productRepository.save(createProductDto);
  //   } catch (error) {
  //     this.logger.error(`Error adding a new product: ${error}`);
  //   }
  // }

  // async update(productId: string, updateProductDto: UpdateProductDto) {
  //   try {
  //     this.logger.log(`This action updates the product data`);
  //     return await this.productRepository.update(productId, updateProductDto);
  //   } catch (error) {
  //     this.logger.error(`Error updating an existing product: ${error}`);
  //   }
  // }

  // async delete(productId: string) {
  //   try {
  //     this.logger.log(`This action deletes the product`);
  //     return await this.productRepository.delete(productId);
  //   } catch (error) {
  //     this.logger.error(`Error deleting an existing product: ${error}`);
  //   }
  // }
}
