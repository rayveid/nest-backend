// точка входа в приложение

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  const PORT = process.env.PORT || '7777'; // порт берем из переменных окружения или 5000
  const app = await NestFactory.create(AppModule); // создаем экземпляр приложения

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
