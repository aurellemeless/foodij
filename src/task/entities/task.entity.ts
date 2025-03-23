import { Meal } from 'src/meal/entities/meal.entity';
import { Planning } from 'src/planning/entities/planning.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  eatAt: Date;

  @OneToOne(() => Meal)
  @JoinColumn()
  meal: Meal;

  @OneToOne(() => Planning)
  @JoinColumn()
  planning: Planning;
}
