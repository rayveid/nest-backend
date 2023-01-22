import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable() // можем инжектить этот сервис
export class UsersService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async create(dto: CreateUserDto) {
    return await this.usersRepository.create(dto);
  }

  async getAll() {
    return await this.usersRepository.findAll();
  }
}
