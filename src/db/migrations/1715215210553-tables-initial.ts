import { MigrationInterface, QueryRunner } from "typeorm";

export class TablesInitial1715215210553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
        CREATE TABLE customer (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            isActive boolean NOT NULL DEFAULT true,
            isArchived boolean NOT NULL DEFAULT false,
            createdAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            name varchar(200) NOT NULL,
            email varchar(200) NOT NULL,
            cpf varchar(200) NOT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE customer;
    `);
  }
}
