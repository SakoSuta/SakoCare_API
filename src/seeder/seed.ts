import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

import { UserSeeder } from './user.seeder';
import { MoodSeeder } from './mood.seeder';
import { ActivitySeeder } from './activity.seeder';
import { ResourceSeeder } from './resource.seeder';
import { EmotionalJournalSeeder } from './emotionalJournal.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userSeeder = app.get(UserSeeder);
  const moodSeeder = app.get(MoodSeeder);
  const activitySeeder = app.get(ActivitySeeder);
  const resourceSeeder = app.get(ResourceSeeder);
  const emotionalJournalSeeder = app.get(EmotionalJournalSeeder);

  await userSeeder.seed();
  await moodSeeder.seed();
  await activitySeeder.seed();
  await resourceSeeder.seed();
  await emotionalJournalSeeder.seed();

  await app.close();
}

bootstrap();
