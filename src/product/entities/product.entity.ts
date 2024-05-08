import { Column, Entity } from 'typeorm';
import { ProductCategory } from '../enums/product-category.enum';
import { AbstractEntity } from 'src/db/abstract.entity';

@Entity()
export class Product extends AbstractEntity<Product>{
  @Column()
  category: ProductCategory;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;
}
