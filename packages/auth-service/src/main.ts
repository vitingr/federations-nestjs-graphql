/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger:
      process.env.NODE_ENV === 'PROD'
        ? ['error', 'warn']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
