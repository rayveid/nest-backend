import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreatePostDto, @UploadedFile() image: string) {
    return this.postsService.create(dto, image);
  }
}
