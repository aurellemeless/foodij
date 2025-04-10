import { Dish } from 'src/dish/entities/dish.entity';
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

  @Column('timestamp with time zone')
  eatAt: Date;

  @OneToOne(() => Dish)
  @JoinColumn()
  dish: Dish;

  @OneToOne(() => Planning)
  @JoinColumn()
  planning: Planning;
}
