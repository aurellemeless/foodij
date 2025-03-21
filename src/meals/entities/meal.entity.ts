import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  components: string;
}
