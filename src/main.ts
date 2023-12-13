import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription(
      'A RESTful service for a simple Todo application using the NestJS framework.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local Environment')
    .addTag('TODOS API ENDPOINTS')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
