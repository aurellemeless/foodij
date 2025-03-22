import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Planning {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;
}
