import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import AddRoleDto from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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

  async addRole(dto: AddRoleDto) {
    const user = await this.usersRepository.findByPk(dto.userId);
    const role = await this.roleService.getByValue(dto.value); // получаем роль из БД

    // если и роль, и пользователь найдены
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('Invalid role or user_id', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.usersRepository.findByPk(dto.userId);

    if (!user) {
      throw new HttpException('Invalid user_id', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save(); // обновляем БД
    return user;
  }
}
