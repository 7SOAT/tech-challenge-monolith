import { HttpModule } from "@nestjs/axios";
import { DynamicModule } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import EnvironmentConfigService from "api/config/environment-config/environment-config.service";
import UsecasesProxyModule from "@api/usecases-proxy/usecases-proxy.module";
import CustomerRoute from "@routes/customer/customer.route";
import HealthRoute from "@routes/health/health.route";
import OrderRoute from "@routes/order/order.route";
import ProductRoute from "@routes/product/product.route";
import MercadoPagoProvider from "@providers/mercado-pago/mercado-pago.provider";

export default class RoutesModule {
    static resgister(): DynamicModule {
        return {
            module: this,
            imports: [TerminusModule, HttpModule, UsecasesProxyModule.register()],
            providers: [
                EnvironmentConfigService,
                MercadoPagoProvider
            ],
            controllers: [
                HealthRoute,
                ProductRoute,
                CustomerRoute,
                OrderRoute
            ]
        }
    }
};