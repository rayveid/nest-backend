import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// аттрибуты, необходимые для создания пользователя
interface RoleCreationAttrs {
  value: string; // user, admin ...
  description: string;
}

@Table({ tableName: 'roles', timestamps: true }) // указываем, для того чтобы класс стал таблицей в БД
export class Role extends Model<Role, RoleCreationAttrs> {
  // колонки в таблице + параметры
  @ApiProperty({ example: 1, description: 'Unique role id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'admin', description: 'Unique role name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  value: string; // поля таблицы

  @ApiProperty({
    example: 'Description of admin role',
    description: 'Role description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
}
