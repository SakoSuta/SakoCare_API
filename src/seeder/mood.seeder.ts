import { Injectable } from '@nestjs/common';
import { MoodService } from '../mood/mood.service';
import { CreateMoodDto } from '../mood/dto/create-mood.dto';

@Injectable()
export class MoodSeeder {
  constructor(private readonly moodService: MoodService) {}

  async seed() {
    const moods: CreateMoodDto[] = [
      { name: 'Very_Sad', type: 'negative', color: '#FF0000' },
      { name: 'Sad', type: 'negative', color: '#FF5733' },
      { name: 'Neutral', type: 'neutral', color: '#FFFF00' },
      { name: 'Happy', type: 'positive', color: '#33FF57' },
      { name: 'Very_Happy', type: 'positive', color: '#00FF00' },
    ];

    for (const mood of moods) {
      await this.moodService.create(mood);
    }

    console.log('Moods seeded successfully.');
  }
}
