import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

function diplaySwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Foodij API')
    .setDescription('The Foodij API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  if (process.env.NODE_ENV === 'development') {
    diplaySwagger(app);
  }
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
