import { EnvironmentConfigService } from "../environment-config/environment-config.service";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const postgresDataSource = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: "postgres",
    host: config.getDatabaseHost(),
    port: config.getDatabasePort() || 5432,
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    synchronize: true,
    entities: [__dirname + "..\\models\\*.model.ts"],
    ssl: true,
    autoLoadEntities: true
  } as TypeOrmModuleOptions);
