import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`, // путь до файла конфигурации
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT), // порт postgres по-умолчанию
      username: process.env.POSTGRES_USER, // пользователь по умолчанию
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB, // название db
      models: [],
      autoLoadModels: true, // автоматическое создание таблиц на основе переданных моделей
    }),
    UsersModule,
  ],
})
export class AppModule {}
