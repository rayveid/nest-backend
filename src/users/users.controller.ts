import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';

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
  @Roles('admin') // гард для проверки авторизации под ролью админ
  @UseGuards(RolesGuard)
  @Get('/getAll')
  async getAll() {
    return await this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Grant role' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('admin') // гард для проверки авторизации под ролью админ
  @UseGuards(RolesGuard)
  @Get('/getAll')
  async grantRole() {
    return await this.usersService.getAll();
  }
}
