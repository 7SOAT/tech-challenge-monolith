import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { postgresDataSource } from './postgres.dataSource';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: postgresDataSource,
    }),
  ],
})
export class TypeOrmConfigModule {}