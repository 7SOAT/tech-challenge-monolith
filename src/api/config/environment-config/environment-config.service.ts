import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DatabaseConfig from '@interfaces/config/database.config';
import PaymentConfig from '@interfaces/config/mercado-pago.config';

@Injectable()
export default class EnvironmentConfigService implements PaymentConfig, DatabaseConfig{
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

  public getPaymentVendedorUserId(): number{
    return this.configService.get<number>('MERCADO_PAGO__VENDEDOR_USER_ID');
  }

  public getPaymentSponsorUserId(): number{
    return this.configService.get<number>('MERCADO_PAGO__SPONSOR_USER_ID');
  }

  public getPaymentAccessToken(): string{
    return this.configService.get<string>('MERCADO_PAGO__ACCESS_TOKEN');
  }
  
  public getPaymentBaseUrl(): string{
    return this.configService.get<string>('MERCADO_PAGO__BASE_URL');
  }

  public getPaymentVersion(): string{
    return this.configService.get<string>('MERCADO_PAGO__API_VERSION');
  }

  public getPaymentCaixaExternalId(): string{
    return this.configService.get<string>('MERCADO_PAGO__EXTERNAL_CAIXA_ID');
  }

  public getPaymentNotificationUrl(): string{
    return this.configService.get<string>('MERCADO_PAGO__NOTIFICATION_URL');
  }
}