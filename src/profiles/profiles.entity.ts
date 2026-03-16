import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum GenderEnum {
  MALE = 'm',
  FEMALE = 'f',
}

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: bigint;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @Column({ type: 'varchar', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'date', nullable: false })
  birth_date: Date;

  @Column({ type: 'varchar', nullable: false })
  birth_place: string;

  @Column({ type: 'enum', enum: GenderEnum, nullable: false })
  gender: GenderEnum;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'bigint', nullable: true })
  grade_id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'now()' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deleted_at: Date | null;
}
