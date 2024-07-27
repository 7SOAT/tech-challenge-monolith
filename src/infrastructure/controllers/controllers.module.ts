import { HttpModule } from "@nestjs/axios";
import { DynamicModule } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import MercadoPagoProvider   from "infrastructure/providers/mercadoPago/mecadoPago.provider";
import UsecasesProxyModule  from "infrastructure/usecases-proxy/usecases-proxy.module";
import OrderUseCase from "useCases/order.usecase";
import CustomerController from "./customer/customer.controller";
import HealthController from "./health/health.controller";
import OrderController from "./order/order.controller";
import ProductController from "./product/product.controller";
import EnvironmentConfigService  from "infrastructure/config/environment-config/environment-config.service";

export default class ControllersModule {
    static resgister(): DynamicModule {
        return {
            module: this,
            imports: [TerminusModule, HttpModule, UsecasesProxyModule.register()],
            providers: [
                EnvironmentConfigService,
                MercadoPagoProvider
            ],
            controllers: [
                HealthController,
                ProductController,
                CustomerController,
                OrderController
            ]
        }
    }
};