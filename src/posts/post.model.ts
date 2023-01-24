import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

// аттрибуты, необходимые для создания пользователя
interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({ tableName: 'posts', timestamps: true }) // указываем, для того чтобы класс стал таблицей в БД
export class Post extends Model<Post, PostCreationAttrs> {
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
    allowNull: false,
    unique: true,
  })
  title: string; // поля таблицы

  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  // помечаем, что пост связан с пользователем
  @BelongsTo(() => User)
  author: User; // у каждой роли мб много пользователей
}
