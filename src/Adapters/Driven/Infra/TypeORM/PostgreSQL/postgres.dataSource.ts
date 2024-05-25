import { DataSource } from "typeorm";

export default class TypeORMPostgreSQLDataSource {
  private _dataSource: DataSource;

  constructor() {
    this._dataSource = new DataSource({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + "../Entities/*.entity.ts"],
      synchronize: true,
      extra: {
        socketPath: process.env.SOCKET_PATH,
      },
    });
  }
}
