import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@testmail.com', description: 'Email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must have email format' })
  readonly email: string;

  @ApiProperty({ example: 'sdfgkjhwdg', description: 'Test password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Password length must be within 4 and 16' })
  readonly password: string;
}
