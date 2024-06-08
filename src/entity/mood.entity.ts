import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EmotionalJournal } from './emotionalJournal.entity';

@Entity('moods')
export class Mood {
  @PrimaryGeneratedColumn({ name: 'mood_id' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  type: string;

  @OneToMany(
    () => EmotionalJournal,
    (emotionalJournal) => emotionalJournal.mood,
  )
  emotionalJournals: EmotionalJournal[];
}
