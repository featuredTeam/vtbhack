import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProjectName } from '../../common/ProjectName';
import { UserMiddleware } from './ middlewares/user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  console.log(ProjectName);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('vtbhack')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('methods')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(8080);
}
bootstrap();
