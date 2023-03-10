import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from '../users/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FilesModule } from '../files/files.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post, User]), FilesModule],
})
export class PostsModule {}
