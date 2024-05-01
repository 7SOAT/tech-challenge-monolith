import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
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
