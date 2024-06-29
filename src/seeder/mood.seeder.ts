import { Injectable } from '@nestjs/common';
import { MoodService } from '../mood/mood.service';
import { CreateMoodDto } from '../mood/dto/create-mood.dto';

@Injectable()
export class MoodSeeder {
  constructor(private readonly moodService: MoodService) {}

  async seed() {
    const moods: CreateMoodDto[] = [
      { name: 'Very_Sad', type: 'negative' },
      { name: 'Sad', type: 'negative' },
      { name: 'Neutral', type: 'neutral' },
      { name: 'Happy', type: 'positive' },
      { name: 'Very_Happy', type: 'positive' },
    ];

    for (const mood of moods) {
      await this.moodService.create(mood);
    }

    console.log('Moods seeded successfully.');
  }
}
