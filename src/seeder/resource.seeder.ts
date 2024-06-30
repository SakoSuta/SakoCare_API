import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../entity/resource.entity';

@Injectable()
export class ResourceSeeder {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async seed() {
    const resources = [
      {
        title: 'Stress Relief Techniques',
        description: 'Techniques and tips for relieving stress.',
        content: 'Detailed content about stress relief techniques.',
        url: 'http://example.com/stress-relief-techniques',
        category: 'stress',
      },
      {
        title: 'Meditation for Stress',
        description: 'How meditation can help reduce stress.',
        content: 'Detailed content about meditation for stress relief.',
        url: 'http://example.com/meditation-for-stress',
        category: 'stress',
      },
      {
        title: 'Better Sleep Tips',
        description: 'Tips for improving your sleep quality.',
        content: 'Detailed content about improving sleep quality.',
        url: 'http://example.com/better-sleep-tips',
        category: 'sleep',
      },
      {
        title: 'Sleep Hygiene',
        description: 'Maintaining good sleep hygiene for better sleep.',
        content: 'Detailed content about sleep hygiene.',
        url: 'http://example.com/sleep-hygiene',
        category: 'sleep',
      },
      {
        title: 'Boost Your Energy',
        description: 'Tips for boosting your energy levels.',
        content: 'Detailed content about boosting energy.',
        url: 'http://example.com/boost-your-energy',
        category: 'energy',
      },
      {
        title: 'Energy-Boosting Foods',
        description: 'Foods that can help boost your energy.',
        content: 'Detailed content about energy-boosting foods.',
        url: 'http://example.com/energy-boosting-foods',
        category: 'energy',
      },
      {
        title: 'Exercise for Beginners',
        description: 'Tips for starting a new exercise routine.',
        content: 'Detailed content about exercise for beginners.',
        url: 'http://example.com/exercise-for-beginners',
        category: 'exercise',
      },
      {
        title: 'Advanced Exercise Routines',
        description: 'Routines for advanced exercise enthusiasts.',
        content: 'Detailed content about advanced exercise routines.',
        url: 'http://example.com/advanced-exercise-routines',
        category: 'exercise',
      },
    ];

    for (const resource of resources) {
      await this.resourceRepository.save(resource);
    }

    console.log('Resources seeded successfully.');
  }
}
