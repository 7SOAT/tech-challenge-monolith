import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import EnvironmentConfigModule from "infrastructure/config/environment-config/environment-config.module";
import ControllersModule from "infrastructure/controllers/controllers.module";
import GatewaysModule  from "infrastructure/gateways/gateways.module";
import ProvidersModule from "infrastructure/providers/providers.module";
import UsecasesProxyModule  from "infrastructure/usecases-proxy/usecases-proxy.module";

@Module({
  imports: [
    EnvironmentConfigModule,
    HttpModule,
    GatewaysModule.register(),
    ProvidersModule.register(),
    UsecasesProxyModule.register(),
    ControllersModule.resgister(),
  ],
})

export default class AppModule {}
