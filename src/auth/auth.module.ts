import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule), // импортируем т/о для избегания кольцевой зависимости
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET', // секретный ключ
      signOptions: {
        expiresIn: '24h', // время жизни ключа
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
