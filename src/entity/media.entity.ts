import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EmotionalJournal } from './emotionalJournal.entity';

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn({ name: 'media_id' })
  id: number;

  @ManyToOne(() => EmotionalJournal)
  @JoinColumn({ name: 'journal_id' })
  journal: EmotionalJournal;

  @Column({ name: 'media_type', type: 'varchar', length: 20 })
  mediaType: string;

  @Column({ type: 'text' })
  url: string;
}
