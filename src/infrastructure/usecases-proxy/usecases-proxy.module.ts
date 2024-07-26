import { DynamicModule, FactoryProvider, Module, Provider } from "@nestjs/common";
import { EnvironmentConfigModule } from "infrastructure/config/environment-config/environment-config.module";
import { CustomerGateway } from "infrastructure/gateways/customer.gateway";
import { GatewaysModule } from "infrastructure/gateways/gateways.module";
import { OrderGateway } from "infrastructure/gateways/order.gateway";
import { ProductGateway } from "infrastructure/gateways/product.gateway";
import { UseCaseProxy } from "infrastructure/usecases-proxy/usecases-proxy";
import { WebhookService } from "../../useCases/Services/MercadoPago/webhook.service";
import { CustomerUseCase } from "../../useCases/customer.usecase";
import { OrderUseCase } from "../../useCases/order.usecase";
import { ProductUseCase } from "../../useCases/product.usecase";
import { MercadoPagoProvider } from "infrastructure/providers/mercadoPago/mecadoPago.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ProvidersModule } from "infrastructure/providers/providers.module";

export class UsecasesProxyModule {

  static PRODUCT_USE_CASE = "ProductUseCase";
  static ORDER_USE_CASE = "OrderUseCase";
  static CUSTOMER_USE_CASE = "CustomerUseCase";
  static WEBHOOK_SERVICE = "WebhookService";
  static WEBHOOK_USE_CASE = "WebhookUseCase";

  static register(): DynamicModule {

    const providers: Provider[] = [
      {
        inject: [HttpService, OrderGateway],
        provide: this.WEBHOOK_USE_CASE,
        useFactory: (
          httpService: HttpService,
          orderGateway: OrderGateway
        ) => new UseCaseProxy(new WebhookService(httpService, orderGateway)),
      },
      {
        inject: [ProductGateway, this.WEBHOOK_USE_CASE],
        provide: this.PRODUCT_USE_CASE,
        useFactory: (
          productGateway: ProductGateway,
        ) => new UseCaseProxy(new ProductUseCase(productGateway)),
      },
      {
        inject: [OrderGateway, CustomerGateway, MercadoPagoProvider, this.PRODUCT_USE_CASE, HttpService],
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
        },
      },
      {
        inject: [CustomerGateway],
        provide: this.CUSTOMER_USE_CASE,
        useFactory: (
          customerGateway: CustomerGateway,
        ) => new UseCaseProxy(new CustomerUseCase(customerGateway)),
      },
      {
        inject: [HttpService, OrderGateway],
        provide: this.WEBHOOK_SERVICE,
        useFactory: (
          httpService: HttpService,
          orderGateway: OrderGateway
        ) => new UseCaseProxy(new WebhookService(httpService, orderGateway)),
      },
      {
        inject: [HttpService, OrderGateway],
        provide: this.WEBHOOK_SERVICE,
        useFactory: (
          httpService: HttpService,
          orderGateway: OrderGateway
        ) => new UseCaseProxy(new WebhookService(httpService, orderGateway)),
      }
    ]
    
    return {
      imports: [ProvidersModule.register(), GatewaysModule.register(), HttpModule],
      module: UsecasesProxyModule,
      providers,
      exports: [
        this.CUSTOMER_USE_CASE,
        this.ORDER_USE_CASE,
        this.PRODUCT_USE_CASE,
        this.WEBHOOK_SERVICE,
        this.WEBHOOK_USE_CASE
      ],
    };
  }
}