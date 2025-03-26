import { Planning } from 'src/planning/entities/planning.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Planning, (planning) => planning.id)
  @JoinTable()
  plannings: Planning[];
}
