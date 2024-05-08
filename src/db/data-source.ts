import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tech_challenge_monolith',
  synchronize: true,
  migrations: [join(__dirname, '**', '*.entity.{ts,js}')],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
