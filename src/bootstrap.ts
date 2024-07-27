import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import MockTables from 'infrastructure/config/typeorm/seed/mockTables.mock-function';
import { EnvironmentConfigService } from 'infrastructure/config/environment-config/environment-config.service';
import { DatabaseConfig } from 'domain/config/database.config';
import { AppConfig } from 'domain/config/app.config';

export async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const databaseConfig: DatabaseConfig = app.get<DatabaseConfig>(EnvironmentConfigService);
  const apiConfig: AppConfig = app.get<AppConfig>(EnvironmentConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('Application for creating and tracking orders.')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  const enableMockTables: boolean = databaseConfig.getEnableMockTables();
  await MockTables(app, enableMockTables);

  await app.listen(apiConfig.getApiPort());
}
