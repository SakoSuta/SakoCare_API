import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Mood } from './mood.entity';

@Entity('emotional_journal')
export class EmotionalJournal {
  @PrimaryGeneratedColumn({ name: 'journal_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.emotionalJournals)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  entry_date: Date;

  @ManyToOne(() => Mood, (mood) => mood.emotionalJournals)
  @JoinColumn({ name: 'mood_id' })
  mood: Mood;

  @Column('int', { array: true, default: [], nullable: true })
  activities: number[];

  @Column({ type: 'smallint', nullable: true })
  energy_level: number;

  @Column({ type: 'smallint', nullable: true })
  stress_level: number;

  @Column({ type: 'smallint', nullable: true })
  social_level: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sleep_hours: number;

  @Column({ type: 'decimal', nullable: true })
  exercise_time: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: false })
  is_favorite: boolean;
}
