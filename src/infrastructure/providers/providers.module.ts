import { DynamicModule, Module } from "@nestjs/common";
import { MercadoPagoProvider } from "./mercadoPago/mecadoPago.provider";
import { HttpModule } from "@nestjs/axios";
import { QRCodeGeneratorProvider } from "./qrCodeGenerator/qrCodeGenerator.provider";


export class ProvidersModule {
    static register(): DynamicModule {
        return {
            module: this,
            imports: [HttpModule],
            providers: [
                MercadoPagoProvider,
                QRCodeGeneratorProvider
            ],
            exports: [MercadoPagoProvider]
        }
    }
}
