import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// если возвращает false - доступ запрещен
@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest(); // получаем объект req из контекста
    try {
      const authHeader = req.headers.authorization; // вытаскиваем хедер из запроса
      const bearer = authHeader.split(' ')[0]; // хедер делим на массимв и вытаскиваем первый элемент - тип токен
      const token = authHeader.split(' ')[1]; // и сам токен
      // если хедеры не соответствуют нужным
      if (bearer != 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User is not authorized' });
      }

      const user = this.jwtService.verify(token);
      req.user = user; // после раскодирования помещаем пользователя в запрос
      return true; // возвращаем тру, т.к. пользователь авторизован
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
  }
}
