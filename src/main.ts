import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AppModule, {
    logger: ["warn", "debug", "error", "log"],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('API.')
    .setVersion('1.0')
    .build();

  const configService: ConfigService<Record<string, unknown>, false> = app.get<ConfigService>(ConfigService);

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(configService.get<number>('API_PORT'));
}

bootstrap();
