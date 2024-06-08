import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mood } from '../entity/mood.entity';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mood])],
  providers: [MoodService],
  controllers: [MoodController],
})
export class MoodModule {}
