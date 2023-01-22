import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'test@testmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'sdfgkjhwdg', description: 'Test password' })
  readonly password: string;
}
