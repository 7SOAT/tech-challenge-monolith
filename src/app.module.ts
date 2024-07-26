import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { ProvidersModule } from "infrastructure/providers/providers.module";
import { ControllersModule } from "infrastructure/controllers/controllers.module";
import { EnvironmentConfigModule } from "infrastructure/config/environment-config/environment-config.module";
import { UsecasesProxyModule } from "infrastructure/usecases-proxy/usecases-proxy.module";
import { GatewaysModule } from "infrastructure/gateways/gateways.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EnvironmentConfigModule,
    HttpModule,
    GatewaysModule.register(),
    ProvidersModule.register(),
    UsecasesProxyModule.register(),
    ControllersModule.resgister(),
  ],
})

export class AppModule {}
