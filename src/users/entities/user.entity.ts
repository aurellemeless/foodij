import { Meal } from 'src/meal/entities/meal.entity';
import { Planning } from 'src/planning/entities/planning.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Planning, (planning) => planning.user)
  plannings: Planning[];

  @ManyToMany(() => Meal, (meal) => meal.favoriteBy)
  @JoinTable()
  favorites: Meal[];

  @Column({ default: false })
  isActive: boolean;

  @Column({ type: 'text', unique: true, nullable: true, default: null })
  activationToken?: string | null;

  @Column({ type: 'text', nullable: true, default: null })
  resetToken?: string | null;

  @Column({ type: 'bigint', nullable: true, default: null })
  resetTokenExpiry: number | null;
}
