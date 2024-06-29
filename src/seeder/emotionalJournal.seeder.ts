import { Injectable } from '@nestjs/common';

import { EmotionDiaryService } from '../emotionDiary/emotionDiary.service';
import { AuthService } from '../auth/auth.service';
import { MoodService } from '../mood/mood.service';
import { ActivityService } from '../activity/activity.service';

import { CreateEmotionDiaryDto } from '../emotionDiary/dto/create-emotion-diary.dto';

@Injectable()
export class EmotionalJournalSeeder {
  constructor(
    private readonly journalService: EmotionDiaryService,
    private readonly authService: AuthService,
    private readonly moodService: MoodService,
    private readonly activityService: ActivityService,
  ) {}

  async seed() {
    const user = await this.authService.findUserByEmail(
      'SakoSuta.em@gmail.com',
    );

    if (!user) {
      throw new Error('User not found');
    }

    const moods = await this.moodService.findAll();
    const activities = await this.activityService.findAll();

    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const currentDate = startDate;

    const journals: CreateEmotionDiaryDto[] = [];

    while (currentDate <= endDate) {
      journals.push({
        user_id: user.id,
        entry_date: new Date(currentDate),
        mood_id: this.getRandomMoodId(moods),
        energy_level: this.getRandomLevel(),
        stress_level: this.getRandomLevel(),
        social_level: this.getRandomLevel(),
        activity_id: this.getRandomActivityId(activities),
        sleep_hours: this.getRandomSleepHours(),
        exercise_time: this.getRandomExerciseTime(),
        description: 'Sample entry for ' + currentDate.toDateString(),
        is_favorite: false,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const journal of journals) {
      await this.journalService.create(journal);
      console.log(`Journal entry created for date: ${journal.entry_date}`);
    }

    console.log('Emotional journals seeded successfully.');
  }

  private getRandomMoodId(moods: any[]): number {
    const mood = moods[Math.floor(Math.random() * moods.length)];
    return mood.id;
  }

  private getRandomActivityId(activities: any[]): number[] {
    const shuffled = activities.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 10) + 1);
    return selected.map((activity) => activity.id);
  }

  private getRandomLevel(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  private getRandomSleepHours(): number {
    return Math.floor(Math.random() * 10) + 1;
  }

  private getRandomExerciseTime(): number {
    return Math.floor(Math.random() * 3) + 1;
  }
}
