import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["warn", "debug", "error", "log"],
  });

  const config = new DocumentBuilder()
    .setTitle('Tech Challenge Monolith API')
    .setDescription('API.')
    .setVersion('1.0')
    .build();
  
  const configService = app.get<ConfigService>(ConfigService);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<number>('API_PORT'));
}
bootstrap();
