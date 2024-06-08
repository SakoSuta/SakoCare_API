import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmotionDiaryService } from './emotionDiary.service';
import { EmotionDiaryController } from './emotionDiary.controller';

import { EmotionalJournal } from '../entity/emotionalJournal.entity';
import { User } from '../entity/user.entity';
import { Mood } from '../entity/mood.entity';
import { Activity } from '../entity/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmotionalJournal, User, Mood, Activity])],
  providers: [EmotionDiaryService],
  controllers: [EmotionDiaryController],
  exports: [EmotionDiaryService],
})
export class EmotionDiaryModule {}
