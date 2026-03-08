import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  role_id: number;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ nullable: true })
  created_at: Date;
}
