import { DynamicModule } from "@nestjs/common";
import MercadoPagoProvider   from "./mercadoPago/mecadoPago.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import QRCodeGeneratorProvider  from "./qrCodeGenerator/qrCodeGenerator.provider";
import EnvironmentConfigModule from "infrastructure/config/environment-config/environment-config.module";
import EnvironmentConfigService  from "infrastructure/config/environment-config/environment-config.service";

export default class ProvidersModule {
    static register(): DynamicModule {
        return {
            module: this,
            imports: [HttpModule, EnvironmentConfigModule],
            providers: [
                EnvironmentConfigService,
                MercadoPagoProvider,
                QRCodeGeneratorProvider
            ],
            exports: [MercadoPagoProvider]
        }
    }
}
