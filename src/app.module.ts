import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432, // порт postgres по-умолчанию
      username: 'postgres', // пользователь по умолчанию
      password: '1201',
      database: 'nest-backend', // название db
      models: [],
      autoLoadModels: true, // автоматическое создание таблиц на основе переданных моделей
    }),
  ],
})
export class AppModule {}
