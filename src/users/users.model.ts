import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// аттрибуты, необходимые для создания пользователя
interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', timestamps: true }) // указываем, для того чтобы класс стал таблицей в БД
export class User extends Model<User, UserCreationAttrs> {
  // колонки в таблице + параметры
  @ApiProperty({ example: 1, description: 'Unique user id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'test@testmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string; // поля таблицы

  @ApiProperty({ example: 'sdfgkjhwdg', description: 'Test password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: true, description: 'Is user banned?' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean; // забанен ли пользователь

  @ApiProperty({
    example: 'Unappropriate content',
    description: 'Reason why user was banned',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
