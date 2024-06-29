import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmotionalJournal } from './emotionalJournal.entity';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn({ name: 'activity_id' })
  id: number;

  @Column({ name: 'activity_type', type: 'varchar', length: 50 })
  activityType: string;

  @ManyToOne(
    () => EmotionalJournal,
    (emotionalJournal) => emotionalJournal.activities,
  )
  emotionalJournal: EmotionalJournal;
}
