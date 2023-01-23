import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';

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
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB, // название db
      models: [User, Role], // добавляем импорт моделей
      autoLoadModels: true, // автоматическое создание таблиц на основе переданных моделей
    }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
