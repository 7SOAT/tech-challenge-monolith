import { Logger, Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmConfigSQL } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: TypeOrmConfigSQL,
      inject: [ConfigService],
    }),
    CustomerModule,
    ProductModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
