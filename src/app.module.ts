import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import EnvironmentConfigModule from "api/config/environment-config/environment-config.module";
import RoutesModule from "api/routes/routes.module";
import GatewaysModule  from "package/gateways/gateways.module";
import ProvidersModule from "@providers/providers.module";
import UsecasesProxyModule  from "api/usecases-proxy/usecases-proxy.module";

@Module({
  imports: [
    EnvironmentConfigModule,
    HttpModule,
    GatewaysModule.register(),
    ProvidersModule.register(),
    UsecasesProxyModule.register(),
    RoutesModule.resgister(),
  ],
})

export default class AppModule {}
