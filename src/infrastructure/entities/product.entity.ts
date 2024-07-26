import IProductOutput from "domain/types/output/product.output";
import { ProductCategory } from "domain/enums/productCategory.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from 'crypto';
import { BaseEntity } from "./base.entity";

@Entity({ name: "product" })
export class ProductEntity extends BaseEntity<ProductEntity> implements IProductOutput {
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ type: "enum", enum: ProductCategory })
  category: ProductCategory;

  @Column({ type: "varchar", length: 200 })
  name: string;

  @Column({ type: "numeric", scale: 2})
  price: number;

  @Column({ type: "varchar", length: 1000 })
  description: string;

}
