import { Column, DataType, Model, Table } from 'sequelize-typescript';

// аттрибуты, необходимые для создания пользователя
interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users', timestamps: true }) // указываем, для того чтобы класс стал таблицей в БД
export class User extends Model<User, UserCreationAttrs> {
  // колонки в таблице + параметры
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string; // поля таблицы

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean; // забанен ли пользователь

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  banReason: string;
}
