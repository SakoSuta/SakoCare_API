import { Injectable } from '@nestjs/common';
import { ActivityService } from '../activity/activity.service';
import { CreateActivityDto } from '../activity/dto/create-activity.dto';

@Injectable()
export class ActivitySeeder {
  constructor(private readonly activityService: ActivityService) {}

  async seed() {
    const activities: CreateActivityDto[] = [
      { activityType: 'Reading' },
      { activityType: 'Exercising' },
      { activityType: 'Cooking' },
      { activityType: 'Traveling' },
      { activityType: 'Working' },
      { activityType: 'Studying' },
      { activityType: 'Gaming' },
      { activityType: 'Watching TV' },
      { activityType: 'Shopping' },
      { activityType: 'Cleaning' },
    ];

    for (const activity of activities) {
      await this.activityService.create(activity);
    }

    console.log('Activities seeded successfully.');
  }
}
