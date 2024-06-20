import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn({ name: 'resource_id' })
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  description: string;

  @Column('text')
  content: string;

  @Column('text', { nullable: true })
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
