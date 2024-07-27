import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseConfig from 'domain/config/database.config';
import MercadoPagoConfig from 'domain/config/mercado-pago.config';

@Injectable()
export default class EnvironmentConfigService implements MercadoPagoConfig, DatabaseConfig{
  constructor(private configService: ConfigService) {}

  public getApiPort(): number{
    return this.configService.get<number>('API_PORT');
  }

  public getDatabaseHost(): string {
    return this.configService.get<string>('POSTGRES__HOST');
  }

  public getDatabasePort(): number {
    return this.configService.get<number>('POSTGRES__PORT');
  }

  public getDatabaseUser(): string {
    return this.configService.get<string>('POSTGRES__USER');
  }

  public getDatabasePassword(): string {
    return this.configService.get<string>('POSTGRES__PASSWORD');
  }

  public getDatabaseName(): string {
    return this.configService.get<string>('POSTGRES__DATABASE');
  }

  public getEnableMockTables(): boolean{
    return this.configService.get<boolean>('ENABLE_MOCK_TABLES');
  }

  public getMercadoPagoVendedorUserId(): number{
    return this.configService.get<number>('MERCADO_PAGO__VENDEDOR_USER_ID');
  }

  public getMercadoPagoSponsorUserId(): number{
    return this.configService.get<number>('MERCADO_PAGO__SPONSOR_USER_ID');
  }

  public getMercadoPagoAccessToken(): string{
    return this.configService.get<string>('MERCADO_PAGO__ACCESS_TOKEN');
  }
  
  public getMercadoPagoBaseUrl(): string{
    return this.configService.get<string>('MERCADO_PAGO__BASE_URL');
  }

  public getMercadoPagoVersion(): string{
    return this.configService.get<string>('MERCADO_PAGO__API_VERSION');
  }

  public getMercadoPagoCaixaExternalId(): string{
    return this.configService.get<string>('MERCADO_PAGO__EXTERNAL_CAIXA_ID');
  }

  public getMercadoPagoNotificationUrl(): string{
    return this.configService.get<string>('MERCADO_PAGO__NOTIFICATION_URL');
  }
}