import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Planning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @OneToMany(() => Task, (task) => task.planning)
  @JoinTable()
  tasks: Task[];
}
