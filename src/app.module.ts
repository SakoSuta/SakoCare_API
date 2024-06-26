import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entity/user.entity';
import { Activity } from './entity/activity.entity';
import { EmotionalJournal } from './entity/emotionalJournal.entity';
import { Mood } from './entity/mood.entity';
import { Resource } from './entity/resource.entity';
import { UserResources } from './entity/userResources.entity';

import { UserSeeder } from './seeder/user.seeder';
import { MoodSeeder } from './seeder/mood.seeder';
import { ActivitySeeder } from './seeder/activity.seeder';
import { ResourceSeeder } from './seeder/resource.seeder';
import { EmotionalJournalSeeder } from './seeder/emotionalJournal.seeder';

import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { EmotionDiaryModule } from './emotionDiary/emotionDiary.module';
import { MoodModule } from './mood/mood.module';
import { ActivityModule } from './activity/activity.module';
import { UserModule } from './user/user.module';
import { AdviceModule } from './advice/advice.module';
import { UserResourcesModule } from './userResources/userResources.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://postgres:DecDOkCDspSZrWNVcQNmGVxATyOzXyGM@monorail.proxy.rlwy.net:52162/railway',
      entities: [
        User,
        Mood,
        Activity,
        EmotionalJournal,
        Resource,
        UserResources,
      ],
      synchronize: true,
      logging: true, // Ajoutez cette ligne pour activer la journalisation
    }),
    TypeOrmModule.forFeature([
      User,
      Mood,
      Activity,
      EmotionalJournal,
      Resource,
      UserResources,
    ]),
    AuthModule,
    FirebaseModule,
    UserModule,
    EmotionDiaryModule,
    MoodModule,
    ActivityModule,
    AdviceModule,
    UserResourcesModule,
  ],
  providers: [
    UserSeeder,
    MoodSeeder,
    ActivitySeeder,
    ResourceSeeder,
    EmotionalJournalSeeder,
  ],
})
export class AppModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    this.logger.log('AppModule initialized');
  }
}
