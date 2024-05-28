import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigSQL } from "./config/typeorm.config";
import { ProductModule } from "./modules/product/product.module";
import { CustomerModule } from "./modules/customer/customer.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
    }),
    ProductModule,
    CustomerModule
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
