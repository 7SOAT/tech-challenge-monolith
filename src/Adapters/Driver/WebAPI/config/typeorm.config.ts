import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import TypeOrmDataSource from "./postgres.dataSource";

export const TypeOrmConfigSQL = async (): Promise<TypeOrmModuleOptions> => ({
  ...TypeOrmDataSource.options,
  autoLoadEntities: true,
});
