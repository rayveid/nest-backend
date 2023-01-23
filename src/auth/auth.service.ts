import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto) {}

  async register(dto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(dto.email);
    // такой пользователь уже существует
    if (candidate) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
        {},
      );
    }
    // если пользователь не найден, хешируем переданный пароль с помощью bcrypt
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.create({
      ...dto,
      password: hashPassword, // заменяем переданный пароль его хешем
    });
    return this.generateToken(user); // возвращаем сгенерированный токен
  }

  generateToken(user: User) {
    const payload = {
      email: user.email,
      password: user.password,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
