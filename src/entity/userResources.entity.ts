import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Resource } from './resource.entity';

@Entity('user_resources')
export class UserResources {
  @PrimaryGeneratedColumn({ name: 'user_resource_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.userResources)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Resource, (resource) => resource.userResources)
  @JoinColumn({ name: 'resource_id' })
  resource: Resource;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
