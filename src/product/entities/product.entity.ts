import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: ProductCategory;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}
