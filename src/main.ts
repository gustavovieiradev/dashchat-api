import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Documentação DASHCHAT API')
    .setDescription('Documentação de todas as funcionalidades da dashchat API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
