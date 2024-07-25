import { Module } from "@nestjs/common";
import { MercadoPagoProvider } from "./mercadoPago/mecadoPago.provider";
import { HttpModule } from "@nestjs/axios";
import { QRCodeGeneratorProvider } from "./qrCodeGenerator/qrCodeGenerator.provider";

@Module({
    imports: [HttpModule],
    providers: [
        MercadoPagoProvider,
        QRCodeGeneratorProvider
    ],
})
export class ProvidersModule { }
