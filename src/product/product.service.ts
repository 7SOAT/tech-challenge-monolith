import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './enums/product-category.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly logger: Logger
  ) {}

  async findAll() {
    try {
      this.logger.log(`This action returns all product`);
      return this.productRepository.find();
    } catch (error) {
      this.logger.error(`Error returning all product: ${error}`);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.productRepository.save(createProductDto);
    } catch (error) {
      this.logger.error(`Error adding a new product: ${error}`);
    }
  }
}
