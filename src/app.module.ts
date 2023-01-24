import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './m2m/user-roles';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/post.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`, // путь до файла конфигурации
    }),
    SequelizeModule.forRoot({
      // модуль для работы с БД
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT), // порт postgres по-умолчанию
      username: process.env.POSTGRES_USER, // пользователь по умолчанию
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB, // название db
      models: [User, Role, UserRoles, Post], // добавляем импорт моделей
      autoLoadModels: true, // автоматическое создание таблиц на основе переданных моделей
    }),
    ServeStaticModule.forRoot({
      // модуль для раздачи статики
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
