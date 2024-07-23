import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD.toString(),
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  entities: [__dirname + "..\\Entities\\*.entity.ts"],
  ssl: true,
  extra: {
    socketPath: process.env.SOCKET_PATH,
  },
});
