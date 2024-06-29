import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmotionalJournal } from './emotionalJournal.entity';
// import { UserResources } from './userResources.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  dateOfBirth: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  reminder: boolean;

  @Column({ name: 'firebase_uid', type: 'varchar', length: 255, unique: true })
  firebaseUid: string;

  @OneToMany(
    () => EmotionalJournal,
    (emotionalJournal) => emotionalJournal.user,
  )
  emotionalJournals: EmotionalJournal[];

  // @OneToMany(() => UserResources, (userResources) => userResources.user)
  // userResources: UserResources[];
}
