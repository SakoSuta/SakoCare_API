import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodService } from './mood.service';
import { MoodController } from './mood.controller';
import { Mood } from '../entity/mood.entity';
import { AuthModule } from '../auth/auth.module';
import { AdminGuard } from '../guard/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Mood]), AuthModule],
  providers: [MoodService, AdminGuard],
  controllers: [MoodController],
})
export class MoodModule {}
