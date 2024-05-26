import TypeOrmDataSource from "../../../Driven/Infra/TypeORM/Config/postgres.dataSource";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeOrmConfigSQL = async (
  configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
  ...TypeOrmDataSource.options,
  autoLoadEntities: true,
});
