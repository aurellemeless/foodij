import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  @OneToMany(() => Task, (task) => task.meal)
  @JoinTable()
  tasks: Task[];
}
