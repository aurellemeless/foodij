import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dish {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => Task, (task) => task.dish)
  @JoinTable()
  tasks: Task[];

  @ManyToMany(() => User, (user) => user.favorites)
  favoriteBy: User[];
}
