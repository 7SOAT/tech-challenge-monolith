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
    private productRepository: Repository<Product>,
    private readonly logger: Logger,
  ) { }
  
  async findAll(): Promise<Product[]> {
    this.logger.log(`This action returns all product`);
    return this.productRepository.find();
  }

  async create(createProductDto: CreateProductDto) {
    this.logger.log(`This action adds a new product`);
    this.productRepository.save(createProductDto);
  }

  findByCategory(category: ProductCategory) {
    this.logger.log(`This action returns all product`);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
