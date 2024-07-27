import { DynamicModule, Provider } from "@nestjs/common";
import { CustomerGateway } from "infrastructure/gateways/customer.gateway";
import { GatewaysModule } from "infrastructure/gateways/gateways.module";
import { OrderGateway } from "infrastructure/gateways/order.gateway";
import { ProductGateway } from "infrastructure/gateways/product.gateway";
import { MercadoPagoProvider } from "infrastructure/providers/mercadoPago/mecadoPago.provider";
import { ProvidersModule } from "infrastructure/providers/providers.module";
import { UseCaseProxy } from "infrastructure/usecases-proxy/usecases-proxy";
import { WebhookUseCase } from "useCases/webhook.usecase";
import { CustomerUseCase } from "../../useCases/customer.usecase";
import { OrderUseCase } from "../../useCases/order.usecase";
import { ProductUseCase } from "../../useCases/product.usecase";
import { EnvironmentConfigService } from "infrastructure/config/environment-config/environment-config.service";

export class UsecasesProxyModule {

  static PRODUCT_USE_CASE = "ProductUseCase";
  static ORDER_USE_CASE = "OrderUseCase";
  static CUSTOMER_USE_CASE = "CustomerUseCase";
  static WEBHOOK_USE_CASE = "WebhookUseCase";

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
      },
      {
        inject: [MercadoPagoProvider, OrderGateway ],
        provide: this.WEBHOOK_USE_CASE,
        useFactory: (
          mercadoPagoProvider: MercadoPagoProvider,
          orderGateway: OrderGateway
        ) => new UseCaseProxy(new WebhookUseCase(mercadoPagoProvider, orderGateway))
      }
    ]
    
    return {
      imports: [ProvidersModule.register(), GatewaysModule.register()],
      module: UsecasesProxyModule,
      providers,
      exports: [
        this.CUSTOMER_USE_CASE,
        this.ORDER_USE_CASE,
        this.PRODUCT_USE_CASE,
        this.WEBHOOK_USE_CASE
      ],
    };
  }
}