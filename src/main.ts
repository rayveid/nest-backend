// точка входа в приложение

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

async function start() {
  const PORT = process.env.PORT || '7777'; // порт берем из переменных окружения или 5000
  const app = await NestFactory.create(AppModule); // создаем экземпляр приложения

  const apiDocsConfig = new DocumentBuilder() // настраиваем документацию
    .setTitle('Nest Backend')
    .setDescription('Test REST API documentation for Nest Backend Up')
    .setVersion('1.0.0')
    .build(); // в конце собираем конфиг

  // создаем саму документацию
  const apiDoc = SwaggerModule.createDocument(app, apiDocsConfig);

  // указываем адрес для документации
  SwaggerModule.setup('/api/docs', app, apiDoc);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
