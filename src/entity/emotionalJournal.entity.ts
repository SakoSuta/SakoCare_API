import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Mood } from './mood.entity';
import { Activity } from './activity.entity';

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

  @Column({ type: 'smallint' })
  energy_level: number;

  @Column({ type: 'smallint' })
  stress_level: number;

  @Column({ type: 'smallint' })
  social_level: number;

  @ManyToOne(() => Activity, (activity) => activity.emotionalJournals)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  sleep_hours: number;

  @Column({ type: 'smallint' })
  exercise_time: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: false })
  is_favorite: boolean;
}
