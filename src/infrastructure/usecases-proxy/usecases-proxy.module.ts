import { DynamicModule, Provider } from "@nestjs/common";
import CustomerGateway from "@gateways/customer.gateway";
import GatewaysModule  from "@gateways/gateways.module";
import OrderGateway from "@gateways/order.gateway";
import ProductGateway from "@gateways/product.gateway";
import MercadoPagoProvider   from "@providers//mercado-pago/mercado-pago.provider";
import ProvidersModule from "@providers//providers.module";
import UseCaseProxy from "infrastructure/usecases-proxy/usecases-proxy";
import CustomerUseCase from "@usecases/customer.usecase";
import OrderUseCase from "@usecases/order.usecase";
import ProductUseCase  from "@usecases/product.usecase";
import EnvironmentConfigService  from "infrastructure/config/environment-config/environment-config.service";

export default class UsecasesProxyModule {

  static PRODUCT_USE_CASE = "ProductUseCase";
  static ORDER_USE_CASE = "OrderUseCase";
  static CUSTOMER_USE_CASE = "CustomerUseCase";

  static register(): DynamicModule {
    const providers: Provider[] = [
      EnvironmentConfigService,
      {
        inject: [ProductGateway],
        provide: this.PRODUCT_USE_CASE,
        useFactory: (
          productGateway: ProductGateway,
        ) => new UseCaseProxy(new ProductUseCase(productGateway)),
      },
      {
        inject: [OrderGateway, CustomerGateway, MercadoPagoProvider, this.PRODUCT_USE_CASE],
        provide: this.ORDER_USE_CASE,
        useFactory: (
          orderGateway: OrderGateway,
          customerGateway: CustomerGateway,
          mercadoPagoProvider: MercadoPagoProvider,
          produtUseCase: UseCaseProxy<ProductUseCase>
        ) => {
          return new UseCaseProxy(
            new OrderUseCase(
              orderGateway,
              customerGateway,
              mercadoPagoProvider,
              produtUseCase.getInstance()
            ))
        }},
      {
        inject: [CustomerGateway],
        provide: this.CUSTOMER_USE_CASE,
        useFactory: (
          customerGateway: CustomerGateway,
        ) => new UseCaseProxy(new CustomerUseCase(customerGateway)),
      }
    ]
    
    return {
      imports: [ProvidersModule.register(), GatewaysModule.register()],
      module: UsecasesProxyModule,
      providers,
      exports: [
        this.CUSTOMER_USE_CASE,
        this.ORDER_USE_CASE,
        this.PRODUCT_USE_CASE
      ],
    };
  }
}