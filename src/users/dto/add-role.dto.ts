import { IsNumber, IsString } from 'class-validator';

export default class AddRoleDto {
  @IsString({ message: 'Must be a string' })
  readonly value: string; // название роли
  @IsNumber({}, { message: 'Must be a number' })
  readonly userId: number; // какому пользователю даем
}
