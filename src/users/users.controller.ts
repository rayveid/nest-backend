import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // инжектим сервис для использования его методов
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Get('getAll')
  async getAll() {
    return await this.usersService.getAll();
  }
}
