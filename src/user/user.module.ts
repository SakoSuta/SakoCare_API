import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { Activity } from '../entity/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmotionalJournal, Activity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
