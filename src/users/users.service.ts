import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable() // можем инжектить этот сервис
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private roleService: RolesService, // импортируем для добавления роли при создании пользователя
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto); // создаем пользователя
    const role = await this.roleService.getByValue('admin'); // получаем роль из БД
    await user.$set('roles', [role.id]); // перезаписываем поле roles в БД
    user.roles = [role];
    return user;
  }

  async getAll() {
    // получаем все поля пользователя
    return await this.usersRepository.findAll({ include: { all: true } });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
