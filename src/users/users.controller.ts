import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('/users')
export class UsersController {
  // инжектим сервис для использования его методов
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 200, type: User })
  @Post('/create')
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Get all users from repository' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/getAll')
  async getAll() {
    return await this.usersService.getAll();
  }
}
