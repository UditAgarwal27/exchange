import * as process from "process";
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
import 'source-map-support';

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as dotenv from 'dotenv';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

dotenv.config({
  path: join(__dirname, `../${process.env.NODE_ENV ?? 'local'}.env`),
});

process.on('unhandledRejection', (error: any) => {
  if (error.isAxiosError) {
    const response = error.response;

    const requestId = error.config?.headers?.['x-request-id'];
    const responseMap = {
      url: error?.config?.url,
      status: response?.status,
      responseData: response?.data,
    };
    console.log(`
      Unhandled API error
      RequestID - ${requestId}
      ${JSON.stringify(responseMap)}
    `)
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService: ConfigService = app.get(ConfigService);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'local') {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
  }

  app.use(express.json({ limit: '5mb' }));
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(configService.get<number>('PORT'));
  console.log(`Server Started On PORT ${configService.get<number>('PORT')}`)
}

bootstrap();
