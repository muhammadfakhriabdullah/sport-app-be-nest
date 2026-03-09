import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  role_id: number;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
