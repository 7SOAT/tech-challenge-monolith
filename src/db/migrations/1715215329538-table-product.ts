import { MigrationInterface, QueryRunner } from "typeorm";

export class TableProduct1715215329538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE product_category AS ENUM ('burger', 'side', 'beverage', 'dessert');
            CREATE TABLE product (
                id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                isActive boolean NOT NULL DEFAULT true,
                isArchived boolean NOT NULL DEFAULT false,
                createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
                category product_category NOT NULL,
                name varchar(200) NOT NULL,
                price int NOT NULL,
                description varchar NOT NULL
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE product;
        DROP TYPE product_category;
    `);
  }
}
