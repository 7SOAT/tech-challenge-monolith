import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import TypeOrmDataSource from "../../../Driven/Infra/Database/Config/postgres.dataSource";

export const TypeOrmConfigSQL = async (): Promise<TypeOrmModuleOptions> => ({
  ...TypeOrmDataSource.options,
  autoLoadEntities: true,
});
