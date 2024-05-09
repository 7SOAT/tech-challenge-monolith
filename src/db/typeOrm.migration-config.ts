import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: +configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  entities: [Product, Customer],
  migrations: [`${__dirname}/migrations/*.ts`],
};

export default new DataSource(dataSourceOptions);