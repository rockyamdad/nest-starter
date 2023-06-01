import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Column({ length: 200 })
  username: string;

  @Column({ length: 200 })
  email: string;
}
