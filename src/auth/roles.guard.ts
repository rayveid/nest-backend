import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

// если возвращает false - доступ запрещен
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string>(
        ROLES_KEY,
        [context.getClass(), context.getHandler()],
      );

      if (!requiredRoles) return true;

      const req = context.switchToHttp().getRequest(); // получаем объект req из контекста
      const authHeader = req.headers.authorization; // вытаскиваем хедер из запроса
      const bearer = authHeader.split(' ')[0]; // хедер делим на массимв и вытаскиваем первый элемент - тип токен
      const token = authHeader.split(' ')[1]; // и сам токен
      // если хедеры не соответствуют нужным
      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user; // после раскодирования помещаем пользователя в запрос
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new HttpException('User doesn have access', HttpStatus.FORBIDDEN);
    }
  }
}
