import { DynamicModule } from "@nestjs/common";
import { MercadoPagoProvider } from "./mercadoPago/mecadoPago.provider";
import { HttpModule, HttpService } from "@nestjs/axios";
import { QRCodeGeneratorProvider } from "./qrCodeGenerator/qrCodeGenerator.provider";
import { EnvironmentConfigModule } from "infrastructure/config/environment-config/environment-config.module";
import { EnvironmentConfigService } from "infrastructure/config/environment-config/environment-config.service";
import { MercadoPagoConfig } from "domain/config/mercado-pago.config";
import { UseCaseProxy } from "infrastructure/usecases-proxy/usecases-proxy";

export class ProvidersModule {
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
