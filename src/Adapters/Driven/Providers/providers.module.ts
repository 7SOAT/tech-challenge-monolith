import { Module } from "@nestjs/common";
import { MercadoPagoProvider } from "./MercadoPago/MecadoPago.provider";
import { HttpModule } from "@nestjs/axios";
import { QRCodeGeneratorProvider } from "./QRCodeGenerator/QRCodeGenerator.provider";

@Module({
    imports: [HttpModule],
    providers: [
        MercadoPagoProvider,
        QRCodeGeneratorProvider
    ],
})
export class ProvidersModule { }
