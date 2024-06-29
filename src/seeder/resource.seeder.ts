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
        title: 'Stress Relief',
        description: 'Techniques and tips for stress relief',
        content: 'Detailed content about stress relief',
        url: 'http://example.com/stress-relief',
      },
      {
        title: 'Energy Boost',
        description: 'Tips for boosting energy levels',
        content: 'Detailed content about boosting energy',
        url: 'http://example.com/energy-boost',
      },
    ];

    for (const resource of resources) {
      await this.resourceRepository.save(resource);
    }
  }
}
