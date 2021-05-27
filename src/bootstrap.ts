import { NestFactory } from '@nestjs/core';
import * as config from 'config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerErrorInterceptor } from './interceptors/logger.error.interceptor';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configuration = new DocumentBuilder()
    .setTitle('Youtube statistics')
    .setDescription('The Youtube statistics API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configuration);
  SwaggerModule.setup('api', app, document);
  const jsonParser = bodyParser.json();
  app.use(jsonParser);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(await app.get(LoggerErrorInterceptor));
  console.log('port: ', config.get('app.port'));
  await app.listen(config.get('app.port'));
return app;
}