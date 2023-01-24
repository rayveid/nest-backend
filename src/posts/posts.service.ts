import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image: string) {
    const fileName = await this.filesService.create(image);
    const post = await this.postRepository.create({ ...dto, image: fileName });
    return post;
  }
}
