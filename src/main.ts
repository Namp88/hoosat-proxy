import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

/**
 * Bootstrap the NestJS application
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);

  // Get API configuration
  const apiPrefix = configService.get('hoosat.api.prefix');
  const apiVersion = configService.get('hoosat.api.version');
  const port = configService.get('PORT') || 3000;

  // Set global prefix
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Hoosat Proxy API')
    .setDescription('Public proxy API for Hoosat blockchain')
    .setVersion('1.0')
    .addTag('blockchain', 'Blockchain operations')
    .addTag('network', 'Network information')
    .addTag('address', 'Address and balance operations')
    .addTag('mempool', 'Mempool operations')
    .addTag('transaction', 'Transaction operations')
    .addTag('node', 'Node information')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/docs`);
  logger.log(`🔗 API endpoint: http://localhost:${port}/${apiPrefix}/${apiVersion}`);
}

bootstrap();
