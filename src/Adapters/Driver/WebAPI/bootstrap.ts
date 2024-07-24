import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import MockTables from 'Adapters/Driver/WebAPI/config/MockTables/mockTables.mock-function';

export async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('Application for creating and tracking orders.')
    .setVersion('1.0')
    .build();

  const configService: ConfigService<Record<string, unknown>, false> = app.get<ConfigService>(ConfigService);

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const enableMockTables: string = configService.get<string>('ENABLE_MOCK_TABLES');
  MockTables(app, enableMockTables);

  await app.listen(configService.get<number>('API_PORT'));
}
