import { Logger, Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { ProductModule } from "./product/product.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./db/data-source";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    TypeOrmModule.forRoot({...dataSourceOptions, autoLoadEntities: true}),
    CustomerModule,
    ProductModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
